"use strict";

var gameLoader = require('./gameLoader');
var util = require('./util');
var renderer = require('./renderer');
var game = gameLoader.loadGame();

var endState = 'q2';
var currentState = 'q0';

function exit() {
    console.log('Goodbye!');
    process.exit(0);
}

module.exports = {
    init: function () {
        renderer.output.push(game[currentState]['prompt']);
        renderer.render();
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
                            renderer.output.push(game[currentState]['prompt']);
                        } else if (game[currentState]['actions'][action][gameObject1]['with'][gameObject2]["prompt"] != undefined) {
                            renderer.output.push(game[currentState]['actions'][action][gameObject1]['with'][gameObject2]["prompt"]);
                        } else {
                            renderer.invalidCommand();
                        }
                    } else {
                        renderer.invalidCommand();
                    }
                }
                // If a prompt on gameobject exists, push it to renderer.output array
                else if (game[currentState]['actions'][action][gameObject1]["prompt"] != undefined) {
                    renderer.output.push(game[currentState]['actions'][action][gameObject1]['prompt']);
                }

                // If this gameObject change state, update current state with new state
                else if (game[currentState]['actions'][action][gameObject1]["nextState"] != undefined) {
                    currentState = game[currentState]['actions'][action][gameObject1]["nextState"];
                    renderer.output.push(game[currentState]['prompt']);
                }
                else {
                    renderer.invalidCommand();
                }
            } else {
                renderer.invalidCommand();
            }
        } else {
            renderer.invalidCommand();
        }

        // Render renderer.output and cleanup array afterwards
        renderer.render();
        if (currentState === endState) {
            exit();
        }

    }
};