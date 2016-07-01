"use strict";

var yaml = require('yamljs');

module.exports = {
    loadGame: function() {
        return yaml.load('./game_instructions.yml');
    }
};
