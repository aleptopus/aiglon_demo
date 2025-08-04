// Fonction pour calculer automatiquement les transitions DST selon la règle européenne
function calculateDSTTransitions(year) {
  // Dernier dimanche de mars (passage à l'heure d'été)
  const lastDayMarch = new Date(Date.UTC(year, 2, 31)); // 31 mars
  const lastSundayMarch = new Date(Date.UTC(year, 2, 31 - lastDayMarch.getUTCDay()));
  
  // Dernier dimanche d'octobre (passage à l'heure d'hiver)
  const lastDayOctober = new Date(Date.UTC(year, 9, 31)); // 31 octobre
  const lastSundayOctober = new Date(Date.UTC(year, 9, 31 - lastDayOctober.getUTCDay()));
  
  return {
    TO_SUMMER: lastSundayMarch.toISOString().split('T')[0], // Format YYYY-MM-DD
    TO_WINTER: lastSundayOctober.toISOString().split('T')[0]
  };
}

// Périodes à LFLL
const DATE_CONFIG = {
  DST_TRANSITIONS: calculateDSTTransitions(new Date().getFullYear()),
  PERIODS: {
    Hiv: [["01-01", "05-04"], ["12-13", "12-31"]],
    Cha: [["05-05", "10-13"]],
    Cre: [["10-14", "12-12"]]
  },
  IFR_ROOM_SCHEDULE: {
    Cha: { // Période chargée
      Sem: { summer: "05:00-19:00", winter: "06:00-20:00" },
      Sam: { summer: "05:30-16:30", winter: "06:30-17:30" },
      Dim: { summer: "06:30-19:00", winter: "07:30-20:00" }
    },
    Cre: { // Période creuse
      Sem: { summer: "05:00-19:00", winter: "06:00-20:00" },
      Sam: { summer: "05:30-16:00", winter: "06:30-17:00" },
      Dim: { summer: "07:00-19:00", winter: "08:00-20:00" }
    },
    Hiv: { // Période hiver
      Sem: { summer: "05:00-19:00", winter: "06:00-20:00" },
      Sam: { summer: "05:30-17:00", winter: "06:30-18:00" },
      Dim: { summer: "06:30-19:00", winter: "07:30-20:00" }
    }
  },
  IFR_CAPACITY_LIMIT: 18 // Capacité maximale quand salle IFR fermée
};

// Rendre DATE_CONFIG accessible globalement pour les tests
if (typeof window !== 'undefined') {
  window.DATE_CONFIG = DATE_CONFIG;
}

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
    // Get month and day based on UTC for period calculation (periods are fixed dates)
    const monthDay = `${String(dateObj.getUTCMonth() + 1).padStart(2, '0')}-${String(dateObj.getUTCDate()).padStart(2, '0')}`;
    
    // Get weekday based on local Paris time for day type (Sem/Sam/Dim)
    const localParisDate = new Date(dateObj.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
    const weekday = localParisDate.getDay(); // 0=Dim, 6=Sam
    
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

  isIFRRoomOpen(timestamp, periodCode, dayType) {
    // Vérifier si la configuration IFR existe pour cette période et ce type de jour
    const ifrSchedule = DATE_CONFIG.IFR_ROOM_SCHEDULE[periodCode]?.[dayType];
    if (!ifrSchedule) {
      console.warn(`Pas de configuration IFR trouvée pour ${periodCode}/${dayType}. Salle considérée comme ouverte par défaut.`);
      return true; // Par défaut, considérer la salle comme ouverte
    }

    // Déterminer si on est en heure d'été ou d'hiver
    const dstOffset = this.getDSTOffset(timestamp);
    const season = dstOffset === 2 ? 'summer' : 'winter';
    const timeRange = ifrSchedule[season];

    if (!timeRange) {
      console.warn(`Pas de plage horaire IFR trouvée pour ${periodCode}/${dayType}/${season}. Salle considérée comme ouverte par défaut.`);
      return true;
    }

    // Parser la plage horaire (format "HH:MM-HH:MM")
    const [startTime, endTime] = timeRange.split('-');
    if (!startTime || !endTime) {
      console.error(`Format de plage horaire IFR invalide: ${timeRange}`);
      return true;
    }

    // Convertir l'heure UTC en heures et minutes
    const utcHours = timestamp.getUTCHours();
    const utcMinutes = timestamp.getUTCMinutes();
    const currentTimeMinutes = utcHours * 60 + utcMinutes;

    // Parser les heures de début et fin
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTimeMinutes = startHours * 60 + startMinutes;
    const endTimeMinutes = endHours * 60 + endMinutes;

    // Vérifier si l'heure actuelle est dans la plage d'ouverture
    const isOpen = currentTimeMinutes >= startTimeMinutes && currentTimeMinutes < endTimeMinutes;

    // Log de débogage (désactivé)
    // console.log(`[IFR DEBUG] ${timestamp.toISOString()} UTC (${utcHours}:${utcMinutes.toString().padStart(2,'0')})`);
    // console.log(`           - Période: ${periodCode}, Jour: ${dayType}, Saison: ${season}`);
    // console.log(`           - Plage IFR: ${timeRange} UTC`);
    // console.log(`           - Salle IFR: ${isOpen ? 'OUVERTE' : 'FERMÉE'}`);

    return isOpen;
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
    
    // Si customSelection est fourni et contient des sélections (non vide), l'utiliser.
    // customSelection est un objet { Je: [...], M: [...], ... }
    const hasCustomSelection = customSelection && Object.values(customSelection).some(arr => arr.length > 0);

    if (hasCustomSelection) {
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
      
      // console.log(`✓ Sélection personnalisée: ${Object.keys(agentProfiles).length} agents mappés.`);
      return agentProfiles;
    }
    
    // Sélection automatique par défaut: 3 Je / 7 M / 7 J / 8 SN (par ordre de priorité)
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
    
    // 7 M (après MC)
    agentsByType.M.filter(p => p.vacation !== 'MC').slice(0, 7).forEach(profile => {
      agentProfiles[index++] = profile;
    });
    
    // 7 J (après JC)
    agentsByType.J.filter(p => p.vacation !== 'JC').slice(0, 7).forEach(profile => {
      agentProfiles[index++] = profile;
    });
    
    // 8 SN (après NC et N)
    const nonNightSN = agentsByType.SN.filter(p => !p.vacation.startsWith('N') && p.vacation !== 'NC');
    nonNightSN.slice(0, 8).forEach(profile => {
      agentProfiles[index++] = profile;
    });
    
    // console.log(`✓ Sélection automatique: ${Object.keys(agentProfiles).length} agents mappés (3 Je + 7 M + 7 J + 8 SN).`);
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
    // Convert UTC timestamp to local Paris time for SIV rule lookup
    const localTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Paris' };
    const localTimeParts = new Intl.DateTimeFormat('en-US', localTimeOptions).formatToParts(timestamp);
    
    const localHours = localTimeParts.find(p => p.type === 'hour').value;
    const localMinutes = localTimeParts.find(p => p.type === 'minute').value;
    const hourMinute = `${localHours}h${localMinutes}`;

    const rule = this.sivRules[dayType]?.[sivPeriod]?.[sivHypothesis]?.[hourMinute];
    
    // Enhanced Debugging for SIV rule lookup (désactivé)
    // console.log(`[SIV DEBUG] Lookup for timestamp: ${timestamp.toISOString()} (UTC) -> ${hourMinute} (Local Paris)`);
    // console.log(`           - Key Parts: dayType='${dayType}', sivPeriod='${sivPeriod}', sivHypothesis='${sivHypothesis}', hourMinute='${hourMinute}'`);
    if (rule !== undefined) {
      console.log(`           - SUCCESS: Found rule. Reduction = ${rule}`);
    } else {
      console.warn(`           - FAILURE: No rule found for these keys.`);
    }

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
      // Moyenne stricte sur les 4 créneaux de 15 min de l'heure courante (i, i+1, i+2, i+3)
      // Si on dépasse la fin du tableau, on ne complète pas avec les créneaux suivants
      let sum = 0;
      let count = 0;
      for (let j = 0; j < 4; j++) {
        const idx = i + j;
        if (idx < capacitySeries.length) {
          sum += capacitySeries[idx];
          count++;
        }
      }
      // Si on n'a pas 4 valeurs (fin de journée), on calcule la moyenne sur les valeurs disponibles
      averagedSeries[i] = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
    }
    return averagedSeries;
  }

  applyHourlyAverageAgents(agentsSeries) {
    // This function applies a 4-period (60-min) rolling average on agent counts
    // Same logic as applyHourlyAverage but specifically for agent counts
    const averagedSeries = new Array(agentsSeries.length).fill(0);

    for (let i = 0; i < agentsSeries.length; i++) {
      let sum = 0;
      let count = 0;
      const usedIndices = [];
      for (let j = 0; j < 4; j++) {
        const idx = i + j;
        if (idx >= 0 && idx < agentsSeries.length) {
          sum += agentsSeries[idx];
          count++;
          usedIndices.push(idx);
        }
      }
      averagedSeries[i] = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
      
      // Log détaillé pour le créneau 15h45 UTC (index 63: 15*4 + 3 = 63)
      if (i === 63) {
        console.log(`=== ANALYSE CRÉNEAU 15h45 UTC (index ${i}) ===`);
        // console.log(`Indices utilisés pour la moyenne: ${usedIndices.join(', ')}`);
        // console.log(`Valeurs d'agents: ${usedIndices.map(idx => agentsSeries[idx]).join(', ')}`);
        // console.log(`Somme: ${sum}, Count: ${count}, Moyenne: ${averagedSeries[i]}`);
        
        // Convertir les indices en heures UTC pour clarification
        const timeSlots = usedIndices.map(idx => {
          const hours = Math.floor(idx * 15 / 60);
          const minutes = (idx * 15) % 60;
          return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
        });
        console.log(`Créneaux horaires UTC: ${timeSlots.join(', ')}`);
      }
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

    const effectiveAgents15Min = []; // Effective agents for each 15-minute slot

    for (let i = 0; i < 96; i++) { // Iterate through 15-minute intervals of the day
      const currentTimestamp = new Date(date);
      // Créer un timestamp UTC pour le début de la journée en utilisant les composants locaux de la date
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
      // console.log(`Agents at ${hourMinuteStr}:`, agentsAtThisSlot); // Debug log

      const sivReduction = this.getSIVReduction(periodCode, dayType, utcTimestamp, sivHypothesis); // Pass utcTimestamp
      console.log(`SIV Reduction at ${hourMinuteStr}:`, sivReduction); // Debug log
      const effectiveAgents = Math.max(0, agentsAtThisSlot - sivReduction);
      console.log(`Effective Agents at ${hourMinuteStr}:`, effectiveAgents); // Debug log
      
      effectiveAgents15Min.push(effectiveAgents);
    }

    // Appliquer le mapping capacité sur chaque créneau de 15 min
    const capacities15Min = effectiveAgents15Min.map(agents => this.staffingLookup(agents));

    // Appliquer la limitation IFR AVANT la moyenne glissante pour chaque créneau de 15 min
    for (let i = 0; i < capacities15Min.length; i++) {
      const currentTimestamp = new Date(date);
      const utcTimestamp = new Date(Date.UTC(currentTimestamp.getFullYear(), currentTimestamp.getMonth(), currentTimestamp.getDate(), 0, 0, 0));
      utcTimestamp.setUTCMinutes(i * 15);

      // Vérifier si la salle IFR est fermée et appliquer la limitation
      if (!this.isIFRRoomOpen(utcTimestamp, periodCode, dayType)) {
        capacities15Min[i] = Math.min(capacities15Min[i], DATE_CONFIG.IFR_CAPACITY_LIMIT);
      }
    }

    // Appliquer la moyenne glissante sur la capacité (fenêtre de 1h) APRÈS limitation IFR
    const averagedCapacities = this.applyHourlyAverage(capacities15Min);

    return {
      capacities: averagedCapacities,
      effectiveAgents: effectiveAgents15Min // On retourne la série des agents effectifs (non moyennés)
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

    // Use the provided customSelection directly for the selected grid
    const selectedAgentProfiles = this.selectAgentProfiles(grid, customSelection);
    console.log('Selected Agent Profiles:', selectedAgentProfiles);
    if (Object.keys(selectedAgentProfiles).length === 0) {
      console.warn(`No agent profiles selected for ${gridKey}. Returning zero capacity.`);
      return { capacities: Array(96).fill(0), effectiveAgents: Array(96).fill(0) };
    }

    const effectiveAgents15Min = []; // Store effective agents for the current day

    for (let i = 0; i < 96; i++) { // Iterate through 15-minute intervals of the current day (96 slots)
      const currentUtcTimestamp = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0));
      currentUtcTimestamp.setUTCMinutes(i * 15);

      // Determine period and day type for the current timestamp (should be consistent with the selected grid)
      const { periodCode: currentPeriodCode, dayType: currentDayType } = this.getPeriodAndDayType(currentUtcTimestamp);
      
      // Convert UTC timestamp to local Paris time for grid lookup
      const localTimeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Paris' };
      const localTimeParts = new Intl.DateTimeFormat('en-US', localTimeOptions).formatToParts(currentUtcTimestamp);
      
      const localHour = localTimeParts.find(p => p.type === 'hour').value;
      const localMinute = localTimeParts.find(p => p.type === 'minute').value;
      const localSecond = localTimeParts.find(p => p.type === 'second').value;
      const hourMinuteStr = `${localHour}:${localMinute}:${localSecond}`;
      
      const agentsAtThisSlot = this.countActiveAgents(selectedAgentProfiles, hourMinuteStr); // Use selectedAgentProfiles directly
      const sivReduction = this.getSIVReduction(currentPeriodCode, currentDayType, currentUtcTimestamp, sivHypothesis);
      const effectiveAgents = Math.max(0, agentsAtThisSlot - sivReduction);
      
      // Log de validation pour SIV fermé
      if (sivHypothesis === 'fermé' && sivReduction !== 0) {
        console.error(`ERREUR SIV: Réduction non nulle (${sivReduction}) en mode fermé!`);
      }
      
      effectiveAgents15Min.push(effectiveAgents);
    }

    // Appliquer le mapping capacité sur chaque créneau de 15 min
    const capacities15Min = effectiveAgents15Min.map(agents => this.staffingLookup(agents));

    // Appliquer la limitation IFR AVANT la moyenne glissante pour chaque créneau de 15 min
    for (let i = 0; i < capacities15Min.length; i++) {
      const currentUtcTimestamp = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0));
      currentUtcTimestamp.setUTCMinutes(i * 15);

      // Déterminer la période et le type de jour pour ce créneau
      const { periodCode: currentPeriodCode, dayType: currentDayType } = this.getPeriodAndDayType(currentUtcTimestamp);

      // Vérifier si la salle IFR est fermée et appliquer la limitation
      if (!this.isIFRRoomOpen(currentUtcTimestamp, currentPeriodCode, currentDayType)) {
        capacities15Min[i] = Math.min(capacities15Min[i], DATE_CONFIG.IFR_CAPACITY_LIMIT);
      }
    }

    // Appliquer la moyenne glissante sur la capacité (fenêtre de 1h) APRÈS limitation IFR
    const averagedCapacities = this.applyHourlyAverage(capacities15Min);

    // Appliquer les règles spéciales pour chaque créneau APRÈS la moyenne glissante
    for (let i = 0; i < averagedCapacities.length; i++) {
      // Appliquer la règle de capacité forcée à 6 entre 23h00 et 01h00 UTC
      const utcHour = Math.floor(i / 4); // Convert index to UTC hour
      if (utcHour === 23 || utcHour === 0) { // 23h00-23h45 et 00h00-00h45 UTC
        averagedCapacities[i] = 6; // Forcer la capacité à 6
      }
    }

    return {
      capacities: averagedCapacities,
      effectiveAgents: effectiveAgents15Min // On retourne la série des agents effectifs (non moyennés)
    };
  }
}

// The CapacityCalculator class is now globally available.
