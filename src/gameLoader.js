"use strict";

var fs = require('fs');

module.exports = {
    loadGame: function() {
        return JSON.parse(fs.readFileSync('./game_instructions.json', 'utf8'));
    }
};
