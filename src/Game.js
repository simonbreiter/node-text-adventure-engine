"use strict";

var fs = require('fs');
var readline = require('readline');
var Util = require('./Util');

var json = JSON.parse(fs.readFileSync('./game_instructions.json', 'utf8'));
var rl = readline.createInterface(process.stdin, process.stdout);
var endstate = 'q2';
var currentState = 'q0';
var output = [];

function init() {
    output.push(json[currentState]['prompt']);
    renderOutput();
    clearOutput();
}

rl.on('line', function(input) {
    if(input != "exit") {
        // Play one round with input
        gameLoop(input);
        // Wait for next input
        rl.prompt();
    } else {
        exit();
    }
}).on('close', function() {
    exit();
});

function renderOutput() {
    Util.clearScreen();
    console.log(output.join("\n"));
    clearOutput();
}

function clearOutput() {
    output = [];
}

function gameLoop(input) {
    var action = input.split(" ")[0]; // Example action: use
    var gameObject1 = input.split(" ")[1]; // Example gameObject: axe
    var combine = input.split(" ")[2]; // Example: with
    var gameObject2 = input.split(" ")[3]; // Example: door
    var possibleActions = Object.keys(json[currentState]['actions']);

    // Check if action is in possible actions
    if(Util.isInArray(action, possibleActions)) {
        var possibleGameObjects = Object.keys(json[currentState]['actions'][action]);
        // If user typed a valid action, check if its also on a valid gameobject
        if(Util.isInArray(gameObject1, possibleGameObjects)) {

            // If a user wants to combine a valid gameobject
            if(combine === "with" && gameObject2 != undefined && json[currentState]['actions'][action][gameObject1]['with'] != undefined) {
                var possibleGameObjectsToCombine = Object.keys(json[currentState]['actions'][action][gameObject1]['with']);
                if(Util.isInArray(gameObject2, possibleGameObjectsToCombine)) {
                    if(json[currentState]['actions'][action][gameObject1]['with'][gameObject2]["nextState"] != undefined) {
                        currentState = json[currentState]['actions'][action][gameObject1]['with'][gameObject2]['nextState'];
                        output.push(json[currentState]['prompt']);
                    } else if(json[currentState]['actions'][action][gameObject1]['with'][gameObject2]["prompt"] != undefined) {
                        output.push(json[currentState]['actions'][action][gameObject1]['with'][gameObject2]["prompt"]);
                    } else{
                        invalidCommand();
                    }
                } else {
                    invalidCommand();
                }
            }
            // If a prompt on gameobject exists, push it to output array
            else if(json[currentState]['actions'][action][gameObject1]["prompt"] != undefined) {
                output.push(json[currentState]['actions'][action][gameObject1]['prompt']);
            }

            // If this gameObject change state, update current state with new state
            else if(json[currentState]['actions'][action][gameObject1]["nextState"] != undefined) {
                currentState = json[currentState]['actions'][action][gameObject1]["nextState"];
                output.push(json[currentState]['prompt']);
            }
            else {
                invalidCommand();
            }
        } else {
            invalidCommand();
        }
    } else {
        invalidCommand();
    }

    // Render output and cleanup array afterwards
    renderOutput();
    if(currentState === endstate) {
        exit();
    }

}

function invalidCommand() {
    Util.clearScreen();
    output.push("You can't do that.")
}

function exit() {
    console.log('Goodbye!');
    process.exit(0);
}

init();
