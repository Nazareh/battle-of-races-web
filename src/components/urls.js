const baseUrl = 'http://localhost:8080/api/v1/';

export const urls = {
    baseUrl: baseUrl,
    postNewGeneral: baseUrl + 'generals',
    getGeneralByName: baseUrl + 'generals/name/',
    getGeneralById: baseUrl + 'generals/',
    units: baseUrl + 'units',
    getUnitsByRace: baseUrl + 'units/race/',
    getArmiesByGeneral: baseUrl + 'armies/generals/',
    postArmyUnits: baseUrl + 'armyunits',
    getArmyUnitsByArmy: baseUrl + 'armyunits/',
    getOpponentes: baseUrl + 'generals/opponents/',
    postCombat: baseUrl +  'combats',
    getWar: baseUrl + 'wars/1',
    putWorkerIntoResource: baseUrl + 'resources/',
    putBuyWorker:  baseUrl + 'resources/idle/',
    getIncomingArmies: baseUrl + "combats/incoming/"
};
