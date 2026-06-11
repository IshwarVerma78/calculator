// js/history.js

const History = {

    entries: [],

    add: function(expression, result) {
        this.entries.push({
            expression,
            result
        });
    },

    render: function() {
        console.log(this.entries);
    }

};