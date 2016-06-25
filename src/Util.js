module.exports = {
    clearScreen: function() {
        process.stdout.write("\u001b[2J\u001b[0;0H");
    },
    isInArray: function(value, array) {
        return array.indexOf(value) > -1;
    }
};
