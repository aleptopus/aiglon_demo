class CapacityCalculator {
  constructor(staffingMap, sivRules, vacationGrids) {
    this.staffingMap = staffingMap;
    this.sivRules = sivRules;
    this.vacationGrids = vacationGrids;
    
    this.periods = {
      Hiv: [["01-01", "05-04"], ["12-13", "12-31"]],
      Cha: [["05-05", "10-13"]], 
      Cre: [["10-14", "12-12"]]
    };

    this.sivPeriodMapping = {
      Hiv: "période hiver",
      Cha: "période chargée",
      Cre: "période creuse"
    };

    this._createStaffingLookup();
  }

  _createStaffingLookup() {
    const mapping = this.staffingMap;
    const keys = Object.keys(mapping).map(Number).sort((a, b) => a - b);
    const maxAgentsInMap = keys.length > 0 ? Math.max(...keys) : 0;
    const maxCapacityInMap = mapping[maxAgentsInMap] || 0;

    this.staffingLookup = (agentsCount) => {
      // Support for decimal values with linear interpolation
      const agentsFloat = Math.max(0, parseFloat(agentsCount));
      
      // If exact match exists
      if (mapping.hasOwnProperty(Math.floor(agentsFloat)) && agentsFloat === Math.floor(agentsFloat)) {
        return mapping[agentsFloat];
      }
      
      // Handle edge cases
      if (agentsFloat > maxAgentsInMap && keys.length > 0) {
        return maxCapacityInMap;
      } else if (agentsFloat < Math.min(...keys) && keys.length > 0) {
        return mapping[keys[0]];
      }
      
      // Linear interpolation for decimal values
      const lowerKey = Math.floor(agentsFloat);
      const upperKey = Math.ceil(agentsFloat);
      
      if (mapping.hasOwnProperty(lowerKey) && mapping.hasOwnProperty(upperKey)) {
        const lowerCapacity = mapping[lowerKey];
        const upperCapacity = mapping[upperKey];
        const fraction = agentsFloat - lowerKey;
        return parseFloat((lowerCapacity + (upperCapacity - lowerCapacity) * fraction).toFixed(2));
      }
      
      // Fallback: find closest available mapping
      let lowerKeys = keys.filter(k => k <= agentsFloat);
      if (lowerKeys.length > 0) {
        return mapping[Math.max(...lowerKeys)];
      }
      return 0;
    };
  }

  getPeriodAndDayType(date) {
    const dateObj = new Date(date);
    const monthDay = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    const weekday = dateObj.getDay(); // 0=Dim, 6=Sam
    
    let period = null;
    for (const [name, ranges] of Object.entries(this.periods)) {
      for (const [start, end] of ranges) {
        if (start > end) {
          if (monthDay >= start || monthDay <= end) {
            period = name;
            break;
          }
        } else if (monthDay >= start && monthDay <= end) {
          period = name;
          break;
        }
      }
      if (period) break;
    }

    if (!period) {
      // Fallback si date hors périodes définies
      const month = dateObj.getMonth() + 1;
      period = month <= 4 ? "Hiv" : (month <= 9 ? "Cha" : "Cre");
    }

    const dayType = weekday === 0 ? "Dim" : (weekday === 6 ? "Sam" : "Sem");
    
    return { periodCode: period, dayType };
  }

  getAgentsByType(gridData) {
    if (!gridData || !gridData.grid || gridData.grid.length === 0) {
      console.warn('getAgentsByType - Grille de vacation invalide ou vide.');
      return { Je: [], M: [], J: [], SN: [] };
    }

    const agents = { Je: [], M: [], J: [], SN: [] };
    
    gridData.grid.forEach(profile => {
      const vacationName = (profile.vacation || "").trim();
      
      if (vacationName.startsWith('Je')) {
        agents.Je.push(profile);
      } else if (vacationName.startsWith('M') || vacationName === 'MC') {
        agents.M.push(profile);
      } else if (vacationName.startsWith('J') || vacationName === 'JC') {
        agents.J.push(profile);
      } else if (vacationName.startsWith('N') || vacationName.startsWith('S') || vacationName === 'NC') {
        agents.SN.push(profile);
      }
    });

    return agents;
  }

  selectAgentProfiles(gridData, customSelection = null) {
    if (!gridData || !gridData.grid || gridData.grid.length === 0) {
      console.warn('selectAgentProfiles - Grille de vacation invalide ou vide.');
      return {};
    }
    
    if (customSelection) {
      // Utiliser la sélection personnalisée fournie par l'interface
      const agentProfiles = {};
      let index = 0;
      
      ['Je', 'M', 'J', 'SN'].forEach(type => {
        if (customSelection[type]) {
          customSelection[type].forEach(agentId => {
            const profile = gridData.grid.find(p => p.vacation === agentId);
            if (profile) {
              agentProfiles[index] = profile;
              index++;
            }
          });
        }
      });
      
      console.log(`✓ Sélection personnalisée: ${Object.keys(agentProfiles).length} agents mappés.`);
      return agentProfiles;
    }
    
    // Sélection automatique par défaut: 3 Je + 8 M + 8 J + 7 SN (par ordre de priorité)
    const agentsByType = this.getAgentsByType(gridData);
    const agentProfiles = {};
    let index = 0;
    
    // 3 Je (tous les Je disponibles)
    agentsByType.Je.slice(0, 3).forEach(profile => {
      agentProfiles[index] = profile;
      index++;
    });
    
    // 8 M (en comptant MC en premier par priorité)
    agentsByType.M.slice(0, 8).forEach(profile => {
      agentProfiles[index] = profile;
      index++;
    });
    
    // 8 J (en comptant JC en premier par priorité)
    agentsByType.J.slice(0, 8).forEach(profile => {
      agentProfiles[index] = profile;
      index++;
    });
    
    // 8 SN (en comptant NC en premier par priorité)
    agentsByType.SN.slice(0, 8).forEach(profile => {
      agentProfiles[index] = profile;
      index++;
    });
    
    console.log(`✓ Sélection automatique: ${Object.keys(agentProfiles).length} agents mappés (3 Je + 8 M + 8 J + 8 SN).`);
    return agentProfiles;
  }

  countActiveAgents(selectedAgentProfiles, hourMinuteStr) {
    let agentsAtThisSlot = 0;
    
    for (const agentId in selectedAgentProfiles) {
      const profile = selectedAgentProfiles[agentId];
      
      // Only count agents with '1' (active), not 'C' (chef/manager)
      const value = profile[hourMinuteStr];
      if (value === '1') {
        agentsAtThisSlot++;
      }
    }
    return agentsAtThisSlot;
  }

  getSIVReduction(periodCode, dayType, timestamp, sivHypothesis) {
    const sivPeriod = this.sivPeriodMapping[periodCode];
    
    // Use local time for SIV rules lookup (rules are in UTC but we display in local time)
    const localHours = timestamp.getHours();
    const localMinutes = timestamp.getMinutes();
    const hourMinute = `${String(localHours).padStart(2, '0')}h${String(localMinutes).padStart(2, '0')}`;

    const rule = this.sivRules[dayType]?.[sivPeriod]?.[sivHypothesis]?.[hourMinute];
    return rule !== undefined ? rule : 0;
  }

  applyHourlyAverage(capacitySeries) {
    // This function will take a series of 15-min capacity values
    // and apply a 4-period (60-min) rolling average, shifted by 3 periods (45 min)
    // to align with the Python script's logic.
    // For simplicity, we'll assume capacitySeries is an array of numbers.
    // In a real scenario, this might involve more complex data structures or a dedicated library.

    const averagedSeries = [];
    for (let i = 0; i < capacitySeries.length; i++) {
      // Calculate average over the next 4 periods (including current)
      let sum = 0;
      let count = 0;
      for (let j = 0; j < 4; j++) {
        if (i + j < capacitySeries.length) {
          sum += capacitySeries[i + j];
          count++;
        }
      }
      // Shift by 3 periods (45 min)
      if (i >= 3) {
        averagedSeries[i - 3] = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
      }
    }
    // Fill remaining values (end of series) with the last calculated average or 0
    for (let i = averagedSeries.length; i < capacitySeries.length; i++) {
      averagedSeries[i] = averagedSeries[averagedSeries.length - 1] || 0;
    }
    return averagedSeries;
  }

  calculateDailyCapacity(date, activeVacations, sivHypothesis = 'VFR fort') {
    const { periodCode, dayType } = this.getPeriodAndDayType(date);
    console.log(`Calculating capacity for date: ${date.toDateString()}, period: ${periodCode}, dayType: ${dayType}`);
    const grid = this.vacationGrids[dayType]?.[periodCode];

    console.log('Debug - vacationGrids:', this.vacationGrids);
    console.log('Debug - dayType:', dayType);
    console.log('Debug - periodCode:', periodCode);
    console.log('Debug - grid before check:', grid);

    if (!grid || !grid.grid || grid.grid.length === 0) {
      console.warn(`No vacation grid found for ${dayType}/${periodCode}. Returning zero capacity.`);
      return { capacities: Array(96).fill(0), effectiveAgents: Array(96).fill(0) };
    }
    console.log('Found grid:', grid);

    const selectedAgentProfiles = this.selectAgentProfiles(grid);
    console.log('Selected Agent Profiles:', selectedAgentProfiles);
    if (Object.keys(selectedAgentProfiles).length === 0) {
      console.warn(`No agent profiles selected for ${dayType}/${periodCode}. Returning zero capacity.`);
      return { capacities: Array(96).fill(0), effectiveAgents: Array(96).fill(0) };
    }

    const capacities = [];
    const effectiveAgentsRawValues = []; // Declare effectiveAgentsRawValues
    for (let i = 0; i < 96; i++) { // Iterate through 15-minute intervals of the day
      const currentTimestamp = new Date(date);
      currentTimestamp.setHours(0, 0, 0, 0); // Start of the day
      currentTimestamp.setMinutes(i * 15);
      currentTimestamp.setSeconds(0); // Ensure seconds are 00

      const hourMinuteStr = `${String(currentTimestamp.getHours()).padStart(2, '0')}:${String(currentTimestamp.getMinutes()).padStart(2, '0')}:00`;
      console.log(`Processing slot ${hourMinuteStr}`);

      const agentsAtThisSlot = this.countActiveAgents(selectedAgentProfiles, hourMinuteStr);
      console.log(`Agents at ${hourMinuteStr}:`, agentsAtThisSlot);

      const sivReduction = this.getSIVReduction(periodCode, dayType, currentTimestamp, sivHypothesis);
      console.log(`SIV Reduction at ${hourMinuteStr}:`, sivReduction);
      const effectiveAgents = Math.max(0, agentsAtThisSlot - sivReduction);
      console.log(`Effective Agents at ${hourMinuteStr}:`, effectiveAgents);
      
      capacities.push(this.staffingLookup(effectiveAgents));
      effectiveAgentsRawValues.push(effectiveAgents); // Store raw effective agents
    }

    // Return raw capacities without rolling average to create step-like curve
    return {
      capacities: capacities,
      effectiveAgents: effectiveAgentsRawValues // Return the stored raw effective agents
    };
  }

  calculateCapacityWithSpecificGrid(gridKey, customSelection = null, sivHypothesis = 'VFR fort') {
    // Parse gridKey (e.g., "SemCha" -> dayType="Sem", periodCode="Cha")
    const dayType = gridKey.substring(0, 3); // "Sem", "Sam", "Dim"
    const periodCode = gridKey.substring(3); // "Cha", "Cre", "Hiv"
    
    console.log(`Calculating capacity for grid: ${gridKey}, dayType: ${dayType}, periodCode: ${periodCode}`);
    
    const grid = this.vacationGrids[dayType]?.[periodCode];
    if (!grid || !grid.grid || grid.grid.length === 0) {
      console.warn(`No vacation grid found for ${gridKey}. Returning zero capacity.`);
      return { capacities: Array(96).fill(0), effectiveAgents: Array(96).fill(0) };
    }

    const selectedAgentProfiles = this.selectAgentProfiles(grid, customSelection);
    console.log('Selected Agent Profiles:', selectedAgentProfiles);
    if (Object.keys(selectedAgentProfiles).length === 0) {
      console.warn(`No agent profiles selected for ${gridKey}. Returning zero capacity.`);
      return { capacities: Array(96).fill(0), effectiveAgents: Array(96).fill(0) };
    }

    // First pass: calculate effective agents for each 15-minute slot
    const effectiveAgentsBy15Min = [];
    
    for (let i = 0; i < 96; i++) {
      const currentTimestamp = new Date();
      currentTimestamp.setHours(0, 0, 0, 0);
      currentTimestamp.setMinutes(i * 15);
      currentTimestamp.setSeconds(0);

      const hourMinuteStr = `${String(currentTimestamp.getHours()).padStart(2, '0')}:${String(currentTimestamp.getMinutes()).padStart(2, '0')}:00`;
      
      const agentsAtThisSlot = this.countActiveAgents(selectedAgentProfiles, hourMinuteStr);
      const sivReduction = this.getSIVReduction(periodCode, dayType, currentTimestamp, sivHypothesis);
      const effectiveAgents = Math.max(0, agentsAtThisSlot - sivReduction);
      
      effectiveAgentsBy15Min.push(effectiveAgents);
    }

    // Second pass: calculate hourly averages and capacities
    const capacities = [];
    const effectiveAgentsHourlyAvg = [];
    
    for (let i = 0; i < 96; i++) {
      // Calculate average over 4 consecutive 15-min periods (1 hour)
      let sum = 0;
      let count = 0;
      
      for (let j = 0; j < 4; j++) {
        if (i + j < 96) {
          sum += effectiveAgentsBy15Min[i + j];
          count++;
        }
      }
      
      const hourlyAvgAgents = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
      effectiveAgentsHourlyAvg.push(hourlyAvgAgents);
      
      // Apply capacity mapping with interpolation
      const capacity = this.staffingLookup(hourlyAvgAgents);
      capacities.push(capacity);
    }

    return {
      capacities: capacities,
      effectiveAgents: effectiveAgentsHourlyAvg
    };
  }
}

// The CapacityCalculator class is now globally available.
