"use strict";
var util = require('./util');
module.exports = {
    output: [],
    clearOutput: function() {
        this.output = [];
    },
    invalidCommand: function() {
        util.clearScreen();
        this.output.push("You can't do that.")
    },
    render: function() {
        util.clearScreen();
        console.log(this.output.join("\n"));
        this.clearOutput();
    }
};
