//ASSIGNMENT INSTRUCTION
// * There will be four crystals displayed as buttons on the page.
//create variables for buttons, html elements

// * The player will be shown a random number at the start of the game.
//generate random number between 19-120 that resets for each game, display in html

// * When the player clicks on a crystal, it will add a specific amount of points to the player's total score. 

//   * Your game will hide this amount until the player clicks a crystal.
//   * When they do click one, update the player's score counter.

//generate random number from 1-12 for each crystal, add to total guessed when clicked. Reset to new random  number for start of new game.

// * The player wins if their total score matches the random number from the beginning of the game.
// If total score equals random number without going over, display player wins and reset game. (new random number to match and new values for cystals)
// score totals go to zero, increase wins by 1

// * The player loses if their score goes above the random number.
// If total score goes over random number, display player loses and reset game. (new random number to match and new values for cystals)
// score totals go to zero, losses increase by 1

//wait for all functions to load before start

$(document).ready(function () {

  //function to setup random number
    getRandom();
 
    //Display Random Number that is between 19 and 120 to start game

    function getRandom() {
        var min = 19;
        var max = 120;
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById("number-to-match").innerHTML = randomNumber;
        return false;
    };
    //function to setup random number for crystals
    function getRandomInt(crystalmin, crystalmax) {
        "use strict";
        if (crystalmax < crystalmin) {
            // Swap min and max
            [crystalmin, crystalmax] = [crystalmin, crystalmax];
        }

        let range = crystalmax - crystalmin + 1;
        return Math.floor(Math.random() * range) + crystalmin;
    }
    //function to assign the random numbers to an array
    function crystalAssign() {

        var numberOptions = Array.from({ length: 4 }, () => getRandomInt(1, 12));

        // console.log(numberOptions);

        //create for loop to assign array numbers to crystals and create crystals
        for (var i = 0; i < numberOptions.length; i++) {

            // For each iteration, create an imageCrystal
            var imageCrystal = $("<img>");

            imageCrystal.addClass("crystal-image");

            // Link crystal to image file
            imageCrystal.attr("src", "assets/images/crystal-snowflake-trans.png");

            // Give each imageCrystal a data attribute called data-crystalValue.
            // This data attribute will be set equal to the array value.
            imageCrystal.attr("data-crystalvalue", numberOptions[i]);

            // Each crystal image (with all it classes and attributes) will get added to the page.
            $("#crystals").append(imageCrystal);
        }
    }
    //run function to assign arrayed random number to each crystal
    crystalAssign();

    //create variables for score board
    counter = 0;
    var Wins = 0;
    var Losses = 0;

    //run function to play the game with clicking on each crystal
    function playGame () {
      //create click event for each crystal to advance score on each click
    $(".crystal-image").on("click", function () {

        //Notes from Crystal Game example  
        // Determining the crystal's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);
        //Add crystalValue to the counter on each click
        counter += crystalValue;

        document.getElementById("yourScore").innerHTML = ("Your score: " + counter);
    
        //if statement for if player wins and resets to scoreboard, reset game and restart game
        if (counter === randomNumber) {
            Wins++;
            counter = 0;
            document.getElementById("yourScore").innerHTML = ("Your score: " + counter);
            document.getElementById("wins").innerHTML = "Wins: " + Wins;
            $(".crystal-image").remove();
            getRandom();
            crystalAssign();
            playGame();
            alert("You win! Press OK to play again.")
        }

        //if statement for if player loses and resets to scoreboard, reset game and restart game
        if (counter >= randomNumber) {
            Losses++;
            counter = 0;
            document.getElementById("yourScore").innerHTML = ("Your score: " + counter);
            document.getElementById("losses").innerHTML = "Losses: " + Losses;
            $(".crystal-image").remove();
            getRandom();
            crystalAssign();
            playGame();
            alert("Sorry, you lose!! Press OK to play again");
        }
    });
};
//call function to play the game
playGame();

});
