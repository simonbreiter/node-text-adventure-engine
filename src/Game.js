"use strict";

var gameLoader = require('./gameLoader');
var util = require('./util');
var game = gameLoader.loadGame();

var endstate = 'q2';
var currentState = 'q0';
var output = [];

function clearOutput() {
    output = [];
}

function invalidCommand() {
    util.clearScreen();
    output.push("You can't do that.")
}

function render() {
    util.clearScreen();
    console.log(output.join("\n"));
    clearOutput();
}

function exit() {
    console.log('Goodbye!');
    process.exit(0);
}

module.exports = {
    init: function () {
        output.push(game[currentState]['prompt']);
        render();
    },
    loop: function (input) {
        var action = input.split(" ")[0]; // Example action: use
        var gameObject1 = input.split(" ")[1]; // Example gameObject: axe
        var combine = input.split(" ")[2]; // Example: with
        var gameObject2 = input.split(" ")[3]; // Example: door
        var possibleActions = Object.keys(game[currentState]['actions']);

        // Check if action is in possible actions
        if (util.isInArray(action, possibleActions)) {
            var possibleGameObjects = Object.keys(game[currentState]['actions'][action]);
            // If user typed a valid action, check if its also on a valid gameobject
            if (util.isInArray(gameObject1, possibleGameObjects)) {

                // If a user wants to combine a valid gameobject
                if (combine === "with" && gameObject2 != undefined && game[currentState]['actions'][action][gameObject1]['with'] != undefined) {
                    var possibleGameObjectsToCombine = Object.keys(game[currentState]['actions'][action][gameObject1]['with']);
                    if (util.isInArray(gameObject2, possibleGameObjectsToCombine)) {
                        if (game[currentState]['actions'][action][gameObject1]['with'][gameObject2]["nextState"] != undefined) {
                            currentState = game[currentState]['actions'][action][gameObject1]['with'][gameObject2]['nextState'];
                            output.push(game[currentState]['prompt']);
                        } else if (game[currentState]['actions'][action][gameObject1]['with'][gameObject2]["prompt"] != undefined) {
                            output.push(game[currentState]['actions'][action][gameObject1]['with'][gameObject2]["prompt"]);
                        } else {
                            invalidCommand();
                        }
                    } else {
                        invalidCommand();
                    }
                }
                // If a prompt on gameobject exists, push it to output array
                else if (game[currentState]['actions'][action][gameObject1]["prompt"] != undefined) {
                    output.push(game[currentState]['actions'][action][gameObject1]['prompt']);
                }

                // If this gameObject change state, update current state with new state
                else if (game[currentState]['actions'][action][gameObject1]["nextState"] != undefined) {
                    currentState = game[currentState]['actions'][action][gameObject1]["nextState"];
                    output.push(game[currentState]['prompt']);
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
        render();
        if (currentState === endstate) {
            exit();
        }

    }
};