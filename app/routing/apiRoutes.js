var friends = require("../data/friends"); //require friends.js


module.exports = function (app) {
    //list friends found in friends.js as JSON
    //API path
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
            user.scores[i] = parseInt(user.scores[i]); // parseINT as Interger not string
        }
        //friend match is the friend with the minimun difference in scores
        // let first match to the first friend
        var bestFriendIndex = 0;
        var lowestDifference = 1000;

        // use this for loop to start off with a zero difference and compare the user and the ith friend scores, one set at a time
        // add the difference to the total difference
        // runs through all current friends in list
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            //run through scores to compare
            for (var j = 0; j < friends[i].scores.length; j++) {
                // find the difference between user and friend scores
                var difference = Math.abs(user.scores[j] - friends[i].scores[j]);

                totalDifference += difference;
            }
            // where there is a new lowest difference in score, set the best friend index to this i and the new low to the totaldifference
            // test = Barney 10 BBird 20 Kermit 30 Heidi 40 Colbert 50
            // if user = 37 = best match is Colbert - ok
            // if user = 14 = best match is BBbird

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
    app.post('/api/clear', function (req, res) {
        // Empty out the arrays of data
        newUser = [];
        console.log(newUser);
    })
};
