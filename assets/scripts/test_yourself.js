// set up the random variables that can go into the calculator
// Velocities - use low or medium for residential and high for speeding and hwy for highway driving
var lowVelocity = Math.random() * (45 - 30) + 30;
var medVelocity = Math.random() * (60 - 45) + 45;
var highVelocity = Math.random() * (80 - 60) + 45;
var hwyVelcoity = Math.random() * (100 - 80) + 80;

// Yellow Phase - limited choices
var ypLow = Math.random() * (3.9 - 3.7) + 3.7;
// Use Norm or High for Highways
var ypNorm = Math.random() * (4.1 - 3.9) + 3.9;
var ypHigh = Math.random() * (4.8 - 4.1) + 4.1;

// Interhase - Limited choices
var ipLow = Math.random() * (1.2 - 0.9) + 0.9;
// Use Norm or High for Highways
var ipNorm = Math.random() * (1.5 - 1.2) + 1.2;
var ipHigh = Math.random() * (2.4 - 1.5) + 1.5; 

// Reaction time
var rtLow = Math.random() * (2.5 - 1.5) + 1.5;
var rtMed = Math.random() * (1.5 - 1.0) + 1.0;
var rtGood = Math.random() * (1.0 - 0.8) + 0.8;
var rtexcel = Math.random() * (0.8 - 0.4) + 0.4;

// Friction
var dryTiresGood = 0.9;
var dryTiresAvg = 0.8;
var dryTiresBad = 0.7;
var wetTiresGood = 0.7;
var wetTiresAvg = 0.6;
var wetTiresBad = 0.5;
var snow = 0.3;
var ice = 0.1;

// Car length
var carLength = Math.random() * (6.2 - 3.8) + 3.8;

// Randomly choose a variable from the list for urban velocities
const velocities = ["lowVelocity", "medVelocity"];
const randomUrban = Math.floor(Math.random() * velocities.length);
console.log(randomUrban, velocities[randomUrban]);

// Randomly Choose a variable from the list for highway velocities
const velocitiesHwy = ["highVelocity", "hwyVelocity"];
const randomHwy = Math.floor(Math.random() * velocitiesHwy.length);
console.log(randomHwy, velocitiesHwy[randomHwy]);

// Randomly Choose a variable from the list for yellow phase
const ypUrban = ["ypLow", "ypNorm", "ypHigh"];
const randomYpUrban = Math.floor(Math.random() * ypUrban.length);
console.log(randomYpUrban, ypUrban[randomYpUrban]);

const ypHwy = ["ypNorm", "ypHigh"];
const randomYpHwy = Math.floor(Math.random() * ypHwy.length);
console.log(randomYpHwy, ypHwy[randomYpHwy]);

// Randomly Choose a variable from the list for interphase
const ipUrban = ["ipLow", "ipNorm", "ipHigh"];
const randomIpUrban = Math.floor(Math.random() * ipUrban.length);
console.log(randomIpUrban, ipUrban[randomIpUrban]);

const ipHwy = ["ipNorm", "ipHigh"];
const randomIpHwy = Math.floor(Math.random() * ipHwy.length);
console.log(randomIpHwy, ipHwy[randomIpHwy]);

// Randomly Choose a variable from the list for reaction time
const driverReaction = ["rtLow", "rtMed", "rtGood", "rtExcel"];
const randomRt = Math.floor(Math.random() * driverReaction.length);
console.log(randomRt, driverReaction[randomRt]);

// Randomly choose friction for cold or hot climates
const tires = ["good", "average", "bad"];
const tireCondition = Math.floor(Math.random() * tires.length);
console.log(tireCondition, tires[tireCondition]);

const hotClimates = ["dryTiresGood", "dryTiresAvg", "dryTiresbad", "wetTiresGood", "wetTiresAvg", "wetTiresbad"];
const randomTireHot = Math.floor(Math.random() * hotClimates.length);
console.log(randomTireHot, hotClimates[randomTireHot]);

const coldClimates = ["dry", "wet", "icy", "snowy"];
const randomTireCold = Math.floor(Math.random() * coldClimates.length);
console.log(randomTireCold, coldClimates[randomTireCold]);

document.getElementById("randomScenario").addEventListener("click", fullscenario); 
function fullscenario() {
    document.getElementById("map-1-initialVelocity").innerHTML = window[velocities[randomUrban]].toFixed(2) + " kmh<sup>-1</sup>";
    document.getElementById("map-1-ylPhase").innerHTML = window[ypUrban[randomYpUrban]].toFixed(1) + " s";
    document.getElementById("map-1-rlPhase").innerHTML = window[ipUrban[randomIpUrban]].toFixed(1) + " s"; 
    document.getElementById("map-1-rtRandom").innerHTML = window[driverReaction[randomRt]].toFixed(2) + " s";
    document.getElementById("map-1-tireCondition").innerHTML = tires[tireCondition]; 
    document.getElementById("map-1-weatherCondition").innerHTML = coldClimates[randomTireCold];
    document.getElementById("map-1-carLength").innerHTML = carLength.toFixed(1);  
}

document.getElementById("map-1-submit").addEventListener("click", calculateScenario);
function calculateScenario() {
    mapOneInitialVelocity = window[velocities[randomUrban]] / 3.6;
    mapOneYellowPhase = window[ypUrban[randomYpUrban]];
    mapOneInterphase = window[ipUrban[randomIpUrban]];
    mapOneReactionTime = window[driverReaction[randomRt]];
    mapOneIntersection = 52;
    mapOneLength = carLength;

    // Calculate the going distance
    let distancePhase = ((+mapOneInitialVelocity * (+mapOneYellowPhase + +mapOneInterphase)) - carLength).toFixed(2);
    console.log(mapOneInitialVelocity, mapOneYellowPhase, mapOneInterphase, carLength);
    console.log(distancePhase);

    // Calculate the stopping distance
    var coefficientTires;
    if (tires[tireCondition] === "good" && coldClimates[randomTireCold] === "dry") { 
    coefficientTires = dryTiresGood;}
    else if (tires[tireCondition] === "good" && coldClimates[randomTireCold] === "wet") {
    coefficientTires = wetTiresGood;}
    else if (tires[tireCondition] === "good" && coldClimates[randomTireCold] === "icy") {
    coefficientTires = ice;}
    else if (tires[tireCondition] === "good" && coldClimates[randomTireCold] === "snowy") {
    coefficientTires = snow;}
    else if (tires[tireCondition] === "average" && coldClimates[randomTireCold] === "dry") {
    coefficientTires = dryTiresAvg;}
    else if (tires[tireCondition] === "average" && coldClimates[randomTireCold] === "wet") {
    coefficientTires = wetTiresAvg;}
    else if (tires[tireCondition] === "average" && coldClimates[randomTireCold] === "icy") {
    coefficientTires = ice;}
    else if (tires[tireCondition] === "average" && coldClimates[randomTireCold] === "snowy") {
    coefficientTires = snow;}
    else if (tires[tireCondition] === "bad" && coldClimates[randomTireCold] === "dry") {
    coefficientTires = dryTiresBad;}
    else if (tires[tireCondition] === "bad" && coldClimates[randomTireCold] === "wet") {
    coefficientTires = wetTiresBad;}
    else if (tires[tireCondition] === "bad" && coldClimates[randomTireCold] === "icy") {
    coefficientTires = ice;}
    else if (tires[tireCondition] === "bad" && coldClimates[randomTireCold] === "snowy") {
    coefficientTires = snow;}
    else coefficientTires = false;
console.log(coefficientTires);

// the end of the calculation function
}







