"use strict";

var fs = require('fs');
var readline = require('readline');
var Util = require('./Util');

var json = JSON.parse(fs.readFileSync('./game_instructions.json', 'utf8'));
var rl = readline.createInterface(process.stdin, process.stdout);
var endstate = 'q3';
var currentState = 'q1';

rl.on('line', function(input) {
    Util.clearScreen();
    gameRound(action, gameObject);
    rl.prompt();
}).on('close', function() {
    exit();
});

function init() {
    Util.clearScreen();
    // Prompt of initial state
    console.log(json[currentState]['prompt']);
}

function gameRound(input) {
    var action = input.split(" ")[0];
    var gameObject = input.split(" ")[1];
    var possibleActions = Object.keys(json[currentState]['actions']);
    if(Util.isInArray(action, possibleActions)) {

        var possibleGameObjects = Object.keys(json[currentState]['actions'][action]);

        if(Util.isInArray(gameObject, possibleGameObjects)) {
            Util.clearScreen();
            currentState = json[currentState]['actions'][action][gameObject];
        } else {
            Util.clearScreen();
            console.log("I can't do that.")
        }
    } else {
        Util.clearScreen();
        console.log("I can't do that.")
    }
    // Print prompt of next state
    console.log(json[currentState]['prompt']);
}

function exit() {
    console.log('Goodbye!');
    process.exit(0);
}

init();