"use strict";

var readline = require('readline');
var game = require('./Game');

var rl = readline.createInterface(process.stdin, process.stdout);

game.init();

rl.on('line', function(input) {
    if(input != "exit") {
        // Play one round with input
        game.loop(input);
        //// Wait for next input
        //rl.prompt();
    } else {
        exit();
    }
}).on('close', function() {
    exit();
});

function exit() {
    console.log('Goodbye!');
    process.exit(0);
}
