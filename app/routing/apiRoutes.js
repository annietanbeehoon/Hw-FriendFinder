var friends = require("../data/friends"); //require friends.js

module.exports = function (app) {
    //return all friends found in friends.js as JSON
    //Base API path
    app.get("/api/friends", function (req, res) {
        res.json(friends);

    })
    console.log(friends);

//body-parsing middleware to populate req.body.
//grab scores for comparision
    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        //Receives user details(name, photo & scores)
        var user = req.body; // store user data received from fetch post

        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }
        //friend match is the first friend with the minimun difference in scores

        var bestFriendIndex = 0;
        var lowestDifference = 40;

        // use this for loop to start off with a zero difference and compare the user and the ith friend scores, one set at a time
        // add the difference to the total difference

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                // find the difference between user and friend scores
                var difference = Math.abs(user.scores[j] - friends[i].scores[j]);

                totalDifference += difference;
            }

            if (totalDifference < lowestDifference) {
                bestFriendIndex = i;
                lowestDifference = totalDifference;
            }
        }
        //after finding match, add user to friend array
        friends.push(user);
        //Send the matched friend back to to the client
        res.json(friends[bestFriendIndex]);
    });
    app.post('/api/clear', function(req, res){
        // Empty out the arrays of data
        newUser = [];
        console.log(newUser);
    })
};
