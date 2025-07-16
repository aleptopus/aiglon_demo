const DATE_CONFIG = {
  DST_TRANSITIONS: {
    TO_SUMMER: '2025-03-30', // Dernier dimanche de mars
    TO_WINTER: '2025-10-26'  // Dernier dimanche d'octobre
  },
  PERIODS: {
    Hiv: [["01-01", "05-04"], ["12-13", "12-31"]],
    Cha: [["05-05", "10-13"]], 
    Cre: [["10-14", "12-12"]]
  }
};

class CapacityCalculator {
  constructor(staffingMap, sivRules, vacationGrids) {
    this.staffingMap = staffingMap;
    this.sivRules = sivRules;
    this.vacationGrids = vacationGrids;
    
    this.periods = DATE_CONFIG.PERIODS;

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
        return mapping[keys[0]]; // Return capacity for the lowest agent count
      } else if (keys.length === 0) {
        return 0; // No mapping available
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
    // Convert to UTC for consistent period/daytype calculation
    const monthDay = `${String(dateObj.getUTCMonth() + 1).padStart(2, '0')}-${String(dateObj.getUTCDate()).padStart(2, '0')}`;
    const weekday = dateObj.getUTCDay(); // 0=Dim, 6=Sam
    
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

  getDSTOffset(date) {
    const year = date.getUTCFullYear();

    // Calcul du dernier dimanche de mars
    const lastDayMarch = new Date(Date.UTC(year, 2, 31));
    const lastSundayInMarch = new Date(Date.UTC(year, 2, 31 - lastDayMarch.getUTCDay()));

    // Calcul du dernier dimanche d'octobre
    const lastDayOctober = new Date(Date.UTC(year, 9, 31));
    const lastSundayInOctober = new Date(Date.UTC(year, 9, 31 - lastDayOctober.getUTCDay()));

    // Si la date est entre le dernier dimanche de mars et le dernier dimanche d'octobre
    if (date >= lastSundayInMarch && date < lastSundayInOctober) {
      return 2; // Heure d'été (UTC+2)
    }
    return 1; // Heure d'hiver (UTC+1)
  }

  getAgentsByType(gridData) {
    if (!gridData || !gridData.grid || gridData.grid.length === 0) {
      console.warn('getAgentsByType - Grille de vacation invalide ou vide.');
      return { Je: [], M: [], J: [], SN: [] };
    }

    const agents = { MC: [], JC: [], NC: [], Je: [], M: [], J: [], SN: [] };
    
    // Sort gridData.grid by 'priorite' first
    const sortedGrid = [...gridData.grid].sort((a, b) => a.priorite - b.priorite);

    sortedGrid.forEach(profile => {
      const vacationName = (profile.vacation || "").trim();
      
      if (vacationName === 'MC') {
        agents.MC.push(profile);
      } else if (vacationName === 'JC') {
        agents.JC.push(profile);
      } else if (vacationName === 'NC') {
        agents.NC.push(profile);
      } else if (vacationName.startsWith('Je')) {
        agents.Je.push(profile);
      } else if (vacationName.startsWith('M')) {
        agents.M.push(profile);
      } else if (vacationName.startsWith('J')) {
        agents.J.push(profile);
      } else if (vacationName.startsWith('N') || vacationName.startsWith('S')) {
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
    
    // Sélection automatique par défaut: 3 Je + 8 M + 8 J + 8 SN (par ordre de priorité)
    const agentsByType = this.getAgentsByType(gridData);
    const agentProfiles = {};
    let index = 0;

    // Inclure les vacations fixes (MC, JC, NC, N) en premier
    agentsByType.MC.forEach(profile => { agentProfiles[index++] = profile; });
    agentsByType.JC.forEach(profile => { agentProfiles[index++] = profile; });
    agentsByType.NC.forEach(profile => { agentProfiles[index++] = profile; });
    
    // Ajouter les 2 agents N fixes (obligatoires)
    const nightAgents = agentsByType.SN.filter(p => p.vacation.startsWith('N'));
    nightAgents.slice(0, 2).forEach(profile => {
      agentProfiles[index++] = profile;
    });
    
    // 3 Je
    agentsByType.Je.slice(0, 3).forEach(profile => {
      agentProfiles[index++] = profile;
    });
    
    // 8 M (après MC)
    agentsByType.M.slice(0, 8 - agentsByType.MC.length).forEach(profile => {
      agentProfiles[index++] = profile;
    });
    
    // 8 J (après JC)
    agentsByType.J.slice(0, 8 - agentsByType.JC.length).forEach(profile => {
      agentProfiles[index++] = profile;
    });
    
    // 8 SN (après NC et N) - ajuster pour les agents N déjà inclus
    const nonNightSN = agentsByType.SN.filter(p => !p.vacation.startsWith('N'));
    nonNightSN.slice(0, 8 - agentsByType.NC.length - nightAgents.slice(0, 2).length).forEach(profile => {
      agentProfiles[index++] = profile;
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
    // Cas spécial "fermé" : aucune réduction
    if (sivHypothesis === 'fermé') {
      return 0;
    }
    
    const sivPeriod = this.sivPeriodMapping[periodCode];
    
    // Convert to UTC for SIV rules lookup
    const utcHours = timestamp.getUTCHours();
    const utcMinutes = timestamp.getUTCMinutes();
    console.log(`Debug in getSIVReduction: timestamp.getUTCMinutes() = ${utcMinutes}`); // Add this line
    const hourMinute = `${String(utcHours).padStart(2, '0')}h${String(utcMinutes).padStart(2, '0')}`;

    const rule = this.sivRules[dayType]?.[sivPeriod]?.[sivHypothesis]?.[hourMinute];
    
    // Debugging SIV rule lookup
    console.log(`SIV Lookup: dayType=${dayType}, sivPeriod=${sivPeriod}, sivHypothesis=${sivHypothesis}, hourMinute=${hourMinute}`);
    console.log(`Rule found: ${rule}`);

    return rule !== undefined ? rule : 0;
  }

  applyHourlyAverage(capacitySeries) {
    // This function will take a series of 15-min capacity values
    // and apply a 4-period (60-min) rolling average, shifted by 3 periods (45 min)
    // to align with the Python script's logic.
    // For simplicity, we'll assume capacitySeries is an array of numbers.
    // In a real scenario, this might involve more complex data structures or a dedicated library.

    const averagedSeries = new Array(capacitySeries.length).fill(0); // Initialize with zeros

    for (let i = 0; i < capacitySeries.length; i++) {
      // Calculate average over the current 15-min slot and the next 3 (total 4 periods = 60 min)
      // The average should be centered, not shifted.
      let sum = 0;
      let count = 0;
      // Calculate average over the current 15-min slot and the next 3 (total 4 periods = 60 min)
      // This means for slot i, we average from i to i+3
      for (let j = 0; j < 4; j++) { // Average over 4 periods: i, i+1, i+2, i+3
        const idx = i + j;
        if (idx >= 0 && idx < capacitySeries.length) {
          sum += capacitySeries[idx];
          count++;
        }
      }
      averagedSeries[i] = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
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

    const capacities15Min = []; // Capacities for each 15-minute slot
    const effectiveAgents15Min = []; // Effective agents for each 15-minute slot

    for (let i = 0; i < 96; i++) { // Iterate through 15-minute intervals of the day
      const currentTimestamp = new Date(date);
      // Créer un timestamp UTC pour le début de la journée
      const utcTimestamp = new Date(Date.UTC(currentTimestamp.getFullYear(), currentTimestamp.getMonth(), currentTimestamp.getDate(), 0, 0, 0));
      utcTimestamp.setUTCMinutes(i * 15); // Ajouter les minutes pour le créneau actuel

      // Les grilles de vacations sont en heure locale. Nous devons convertir l'heure UTC du créneau
      // en heure locale de Paris pour la recherche dans la grille.
      const localTimeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Paris' };
      const localTimeParts = new Intl.DateTimeFormat('en-US', localTimeOptions).formatToParts(utcTimestamp);
      
      const localHour = localTimeParts.find(p => p.type === 'hour').value;
      const localMinute = localTimeParts.find(p => p.type === 'minute').value;
      const localSecond = localTimeParts.find(p => p.type === 'second').value;

      const hourMinuteStr = `${localHour}:${localMinute}:${localSecond}`;
      console.log(`Processing slot (UTC): ${utcTimestamp.toISOString()} -> (Local Paris): ${hourMinuteStr}`); // Debug log

      // Debugging DST conversion for specific dates
      if (i === 0) { // Only log for the first slot (00:00 UTC)
        const testDateSummer = new Date(Date.UTC(2025, 6, 15, 0, 0, 0)); // July 15, 2025 00:00 UTC
        const testDateWinter = new Date(Date.UTC(2025, 0, 15, 0, 0, 0)); // Jan 15, 2025 00:00 UTC

        const summerLocalParts = new Intl.DateTimeFormat('en-US', localTimeOptions).formatToParts(testDateSummer);
        const winterLocalParts = new Intl.DateTimeFormat('en-US', localTimeOptions).formatToParts(testDateWinter);

        const summerLocalTime = `${summerLocalParts.find(p => p.type === 'hour').value}:${summerLocalParts.find(p => p.type === 'minute').value}:${summerLocalParts.find(p => p.type === 'second').value}`;
        const winterLocalTime = `${winterLocalParts.find(p => p.type === 'hour').value}:${winterLocalParts.find(p => p.type === 'minute').value}:${winterLocalParts.find(p => p.type === 'second').value}`;

        console.log(`DEBUG DST: 2025-07-15 00:00 UTC -> Local Paris: ${summerLocalTime}`);
        console.log(`DEBUG DST: 2025-01-15 00:00 UTC -> Local Paris: ${winterLocalTime}`);
      }

      const agentsAtThisSlot = this.countActiveAgents(selectedAgentProfiles, hourMinuteStr);
      console.log(`Agents at ${hourMinuteStr}:`, agentsAtThisSlot); // Debug log

      const sivReduction = this.getSIVReduction(periodCode, dayType, utcTimestamp, sivHypothesis); // Pass utcTimestamp
      console.log(`SIV Reduction at ${hourMinuteStr}:`, sivReduction); // Debug log
      const effectiveAgents = Math.max(0, agentsAtThisSlot - sivReduction);
      console.log(`Effective Agents at ${hourMinuteStr}:`, effectiveAgents); // Debug log
      
      capacities15Min.push(this.staffingLookup(effectiveAgents));
      effectiveAgents15Min.push(effectiveAgents);
    }

    // Apply hourly average to the 15-min capacities
    const averagedCapacities = this.applyHourlyAverage(capacities15Min);

    return {
      capacities: averagedCapacities,
      effectiveAgents: effectiveAgents15Min // Still return 15-min effective agents if needed elsewhere
    };
  }

  calculateCapacityWithSpecificGrid(gridKey, customSelection = null, sivHypothesis = 'VFR fort', startDate = new Date()) {
    // Parse gridKey (e.g., "SemCha" -> dayType="Sem", periodCode="Cha")
    const dayType = gridKey.substring(0, 3); // "Sem", "Sam", "Dim"
    const periodCode = gridKey.substring(3); // "Cha", "Cre", "Hiv"
    
    console.log(`Calculating capacity for grid: ${gridKey}, dayType: ${dayType}, periodCode: ${periodCode}`);
    console.log(`SIV Hypothesis: ${sivHypothesis}`);
    
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

    const capacities15Min = []; // Capacities for each 15-minute slot
    const effectiveAgents15Min = []; // Effective agents for each 15-minute slot
    
    for (let i = 0; i < 96; i++) {
      // Créer un timestamp UTC pour le début de la journée
      const utcTimestamp = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), 0, 0, 0));
      utcTimestamp.setUTCMinutes(i * 15);

      // Appliquer le décalage DST pour obtenir l'heure locale correcte
      // L'offset doit être basé sur le timestamp UTC du créneau, pas seulement la startDate
      const offset = this.getDSTOffset(utcTimestamp);
      // Utiliser Intl.DateTimeFormat pour une conversion précise en heure locale de Paris
      const localTimeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Paris' };
      const localTimeParts = new Intl.DateTimeFormat('en-US', localTimeOptions).formatToParts(utcTimestamp);
      
      const localHour = localTimeParts.find(p => p.type === 'hour').value;
      const localMinute = localTimeParts.find(p => p.type === 'minute').value;
      const localSecond = localTimeParts.find(p => p.type === 'second').value; // Should be '00'
      const hourMinuteStr = `${localHour}:${localMinute}:${localSecond}`;
      
      console.log(`Processing slot (UTC): ${utcTimestamp.toISOString()}, Local grid time (Paris): ${hourMinuteStr}`);
      
      const agentsAtThisSlot = this.countActiveAgents(selectedAgentProfiles, hourMinuteStr);
      const sivReduction = this.getSIVReduction(periodCode, dayType, utcTimestamp, sivHypothesis);
      const effectiveAgents = Math.max(0, agentsAtThisSlot - sivReduction);
      
      // Log de validation pour SIV fermé
      if (sivHypothesis === 'fermé' && sivReduction !== 0) {
        console.error(`ERREUR SIV: Réduction non nulle (${sivReduction}) en mode fermé!`);
      }
      
      capacities15Min.push(this.staffingLookup(effectiveAgents));
      effectiveAgents15Min.push(effectiveAgents);
    }

    // Apply hourly average to the 15-min capacities
    const averagedCapacities = this.applyHourlyAverage(capacities15Min);
    
    // For calculateCapacityWithSpecificGrid, we might still want effectiveAgentsHourlyAvg
    // if it's used for display or other calculations.
    // For now, we'll just return the averaged capacities.
    const effectiveAgentsHourlyAvg = this.applyHourlyAverage(effectiveAgents15Min);

    return {
      capacities: averagedCapacities,
      effectiveAgents: effectiveAgentsHourlyAvg // Return averaged effective agents for consistency
    };
  }
}

// The CapacityCalculator class is now globally available.
