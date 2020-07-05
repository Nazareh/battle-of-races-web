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
    postCombatRequest: baseUrl +  'combats/request',
    getWar: baseUrl + 'wars/1',
    putWorkerIntoResource: baseUrl + 'resources/',
    putBuyWorker:  baseUrl + 'resources/idle/',
    getIncomingArmies: baseUrl + "combats/incoming/",
    getCombatLogsByGeneral: baseUrl + "combats/general/",
    getCombatLog: baseUrl + "combats/log/",
    login:'http://localhost:8080/login',
    logout:'http://localhost:8080/logout/',
    register:'http://localhost:8080/register',
};
