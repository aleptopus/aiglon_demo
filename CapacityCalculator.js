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
      const agentsRounded = Math.max(0, Math.round(agentsCount));
      if (mapping.hasOwnProperty(agentsRounded)) {
        return mapping[agentsRounded];
      } else if (agentsRounded > maxAgentsInMap && keys.length > 0) {
        return maxCapacityInMap;
      } else if (agentsRounded < Math.min(...keys) && keys.length > 0) {
        return mapping[keys[0]]; // Smallest key, typically 0 or 1
      } else {
        // Find the largest key less than or equal to agentsRounded
        let lowerKeys = keys.filter(k => k <= agentsRounded);
        if (lowerKeys.length > 0) {
          return mapping[Math.max(...lowerKeys)];
        }
        return 0; // Default if no mapping found
      }
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

  selectAgentProfiles(gridData) {
    console.log('selectAgentProfiles - gridData:', gridData);
    console.log('selectAgentProfiles - gridData.grid:', gridData.grid); // Add this log
    if (!gridData || !gridData.grid || gridData.grid.length === 0) {
      console.warn('selectAgentProfiles - Invalid gridData or empty grid.');
      return {};
    }
    
    // Filtrer les vacations non-chef et trier par priorité
    const nonChefProfiles = gridData.grid
      .filter(profile => {
        console.log('selectAgentProfiles - Checking profile:', profile); // Log the entire profile object
        console.log('selectAgentProfiles - Checking profile.vacation:', profile.vacation);
        return !['JC', 'MC', 'NC'].includes(profile.vacation);
      })
      .sort((a, b) => a.priorite - b.priorite);
    
    console.log('selectAgentProfiles - nonChefProfiles:', nonChefProfiles);

    // Prendre les 7 premiers profils
    const selectedProfiles = nonChefProfiles.slice(0, 7);
    
    console.log('selectAgentProfiles - selectedProfiles (sliced):', selectedProfiles);

    // Créer un mapping d'agents
    const agentProfiles = {};
    selectedProfiles.forEach((profile, i) => {
      agentProfiles[i] = profile;
    });
    
    return agentProfiles;
  }

  countActiveAgents(selectedAgentProfiles, hourMinuteStr) {
    let agentsAtThisSlot = 0;
    for (const agentId in selectedAgentProfiles) {
      const profile = selectedAgentProfiles[agentId];
      // Check if the agent is active ('1') at this specific time slot
      if (profile[hourMinuteStr] === '1') {
        agentsAtThisSlot++;
      }
    }
    return agentsAtThisSlot;
  }

  getSIVReduction(periodCode, dayType, timestamp, sivHypothesis) {
    const sivPeriod = this.sivPeriodMapping[periodCode];
    const hourMinute = `${String(timestamp.getHours()).padStart(2, '0')}h${String(timestamp.getMinutes()).padStart(2, '0')}`;

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

      const hourMinuteStr = `${String(currentTimestamp.getHours()).padStart(2, '0')}h${String(currentTimestamp.getMinutes()).padStart(2, '0')}`;
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

    // Apply rolling average as per Python script
    const finalCapacities = this.applyHourlyAverage(capacities);
    
    return {
      capacities: finalCapacities,
      effectiveAgents: effectiveAgentsRawValues // Return the stored raw effective agents
    };
  }
}

// The CapacityCalculator class is now globally available.
