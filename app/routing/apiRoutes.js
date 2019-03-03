// LOAD DATA SOURCE
var friendsData = require("../data/friends")


module.exports = function (app){

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res){

        // New data from new user
        var userInput = req.body;

        friendsData.push(userInput);

        var newUserScores = [];
        for (var i = 0; i < userInput.scores.length; i++) {
            var score = parseInt(userInput.scores[i]);
            newUserScores.push(score);
        }

        userInput.scores = newUserScores;

        var totals = [];
        var userScores = userInput.scores;

        for (var i = 0; i < friendsData.length - 1; i++) {
            var total = 0;
            scores = friendsData[i].scores;

            for (var x = 0; x < scores.length; x++) {
                var diff = Math.abs(userScores[x] - friendsData[i].scores[x]);
                total += diff;
            }

            totals.push(total);
        }

        var min = Math.min.apply(null, totals);
        var index = totals.indexOf(min);
        var match = friendsData[index];


        // STORES THE MATCH, WHICH IS DISPLAYED VIA MODAL ON FRONT END
        res.json(match);

        console.log("new user added: " + userInput.name + " " + userInput.scores);
        console.log("your match is " + match.name);
        console.log("match info: " + match.name + " " + match.scores);


    });

    app.get("/api/friends/clear", function(req, res){
        friendsData = [];
    });

};