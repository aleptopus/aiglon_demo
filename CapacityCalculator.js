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

  selectAgentProfiles(grid) {
    if (!grid || grid.length === 0) return {};
    
    // Filtrer les vacations non-chef et trier par priorité
    const nonChefProfiles = grid
      .filter(profile => !['JC', 'MC', 'NC'].includes(profile.Vacation)) // 'Vacation' is the correct key from parseCsv
      .sort((a, b) => a.Priorité - b.Priorité); // 'Priorité' is the correct key
    
    // Prendre les 7 premiers profils
    const selectedProfiles = nonChefProfiles.slice(0, 7);
    
    // Créer un mapping d'agents
    const agentProfiles = {};
    selectedProfiles.forEach((profile, i) => {
      agentProfiles[i] = profile;
    });
    
    return agentProfiles;
  }

  getSIVReduction(periodCode, dayType, timestamp, sivHypothesis) { // timestamp is a Date object
    const sivPeriod = this.sivPeriodMapping[periodCode];
    // Use UTC hours and minutes for SIV rule lookup, as keys in sivRules are UTC time strings
    const hourMinute = `${String(timestamp.getUTCHours()).padStart(2, '0')}h${String(timestamp.getUTCMinutes()).padStart(2, '0')}`;

    const rule = this.sivRules[dayType]?.[sivPeriod]?.[sivHypothesis]?.[hourMinute];
    return rule !== undefined ? rule : 0;
  }

  applyHourlyAverage(capacitySeries) {
    const resultSeries = [];
    const fillValue = 6.0; // From Python's fillna(6.0)
    const length = capacitySeries.length;

    if (length === 0) {
      return [];
    }

    for (let i = 0; i < length; i++) {
      // Python's rolling().mean().shift(-3).fillna() means:
      // result[i] = mean(original[i], original[i+1], original[i+2], original[i+3])
      // For the last 3 elements, this window goes out of bounds for original[i+1] etc.
      // and pandas shift(-3) would make these NaN, then fillna applies.
      if (i >= length - 3 && length > 3) { // Ensure length > 3 to avoid issues with very short series
        resultSeries[i] = fillValue;
        continue;
      }
       if (i >= length -3 && length <=3) { // if series is 1,2,3 long, it still computes average
          // let it compute with min_periods=1 logic below
       }


      let sum = 0;
      let count = 0;
      // Window of 4 periods: current (i) and next 3 (i+1, i+2, i+3)
      for (let j = 0; j < 4; j++) {
        if (i + j < length) {
          sum += capacitySeries[i + j];
          count++;
        } else {
          // min_periods=1 effect: if window is shorter, average what's available
          break;
        }
      }

      if (count > 0) {
        resultSeries[i] = parseFloat((sum / count).toFixed(2));
      } else {
        // This case should ideally not be reached if capacitySeries is not empty
        // and i is within bounds where count should be at least 1.
        resultSeries[i] = fillValue;
      }
    }
    return resultSeries;
  }

  calculateDailyCapacity(date, activeVacations, sivHypothesis = 'VFR fort', forcedPeriod = null) {
    const { periodCode: dateDerivedPeriod, dayType } = this.getPeriodAndDayType(date);
    const actualPeriodCode = forcedPeriod || dateDerivedPeriod;

    // Ensure actualPeriodCode is one of "Hiv", "Cha", "Cre"
    const validPeriods = ["Hiv", "Cha", "Cre"];
    if (!validPeriods.includes(actualPeriodCode)) {
        console.warn(`Invalid period code: ${actualPeriodCode}. Defaulting to date-derived or 'Cha'.`);
        // Fallback if forcedPeriod is somehow invalid
        this.periodCodeForGrid = validPeriods.includes(dateDerivedPeriod) ? dateDerivedPeriod : "Cha";
    } else {
        this.periodCodeForGrid = actualPeriodCode; // Store for SIV reduction use if needed
    }

    const grid = this.vacationGrids[dayType]?.[this.periodCodeForGrid];

    if (!grid || grid.length === 0) {
      console.warn(`No vacation grid found for ${dayType}/${this.periodCodeForGrid}. Returning zero capacity.`);
      return Array(96).fill(0); // 96 periods of 15 minutes in a day
    }

    const selectedAgentProfiles = this.selectAgentProfiles(grid);
    if (Object.keys(selectedAgentProfiles).length === 0) {
      console.warn(`No agent profiles selected for ${dayType}/${periodCode}. Returning zero capacity.`);
      return Array(96).fill(0);
    }

    const capacities = [];
    const effectiveAgentsOverTime = []; // To store effective agents for each slot

    for (let i = 0; i < 96; i++) { // Iterate through 15-minute intervals of the day
      const currentTimestamp = new Date(date); // currentTimestamp is local, based on the input 'date'
      currentTimestamp.setHours(0, 0, 0, 0); // Start of the day
      currentTimestamp.setMinutes(i * 15);

      const hourMinuteStr = `${String(currentTimestamp.getHours()).padStart(2, '0')}h${String(currentTimestamp.getMinutes()).padStart(2, '0')}`;

      let agentsAtThisSlot = 0;
      for (const agentId in selectedAgentProfiles) {
        const profile = selectedAgentProfiles[agentId];
        // Check if the agent is active ('1') or 'C' (Chef) at this specific time slot
        // The Python script only counts '1', so we'll stick to that for now.
        // 'C' and 'P' are for chef and presence, not active agents for capacity calculation
        if (profile[hourMinuteStr] === '1') {
          agentsAtThisSlot++;
        }
      }

      // Use this.periodCodeForGrid for SIV reduction, as it reflects the user's period choice
      const sivReduction = this.getSIVReduction(this.periodCodeForGrid, dayType, currentTimestamp, sivHypothesis);
      const effectiveAgents = Math.max(0, agentsAtThisSlot - sivReduction);
      effectiveAgentsOverTime.push(effectiveAgents); // Store it
      
      capacities.push(this.staffingLookup(effectiveAgents));
    }

    // Apply rolling average as per Python script
    const finalCapacities = this.applyHourlyAverage(capacities);
    
    return {
      capacities: finalCapacities,
      effectiveAgents: effectiveAgentsOverTime // Use the collected array
    };
  }
}

// The CapacityCalculator class is now globally available.
