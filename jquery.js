let playing = false;
let score;
let trialsLeft;
let step;
let action; // use for stepInterval
let fruits = ['Apple','Blackberry','Cherries','KiwiFruit','Lemon2','Lime','Raspberry','Strawberry','Watermelon']
$(function(){
// click on start reset button
$("#startreset").click(function(){

    // we are playing
    if(playing == true){

        //reload page
        location.reload();
    }else{

        // we are not playing
        playing = true; // game initiated

        //set score 0
        score = 0;
        $("#scorevalue").html(score);

        //show lifes
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        // start action


        startAction();
}
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
    // document.getElementById("#sliceSound").play();
    $("#sliceSound")[0].play(); // play sound

    // stop fruit going down and hide
    clearInterval(action);

    // animation 
    $("#fruit1").hide("explode",300)

    // send new fruit
    setTimeout(startAction,300);
});

function addHearts(){
$("#trialsLeft").empty();
for(i = 0; i < trialsLeft; i++){
    $("#trialsLeft").append('<img src="images/heart.png" class="life">');
}
}

// start sending fruits
function startAction(){

// generate a fruit
// $("#fruitsContainer").append('<img src="images/Apple.png" class="fruit">'); 
$("#fruit1").show();
chooseFruit();// choose random fruit
$("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});
// random position

// generate a random step
step = 1*Math.round(5*Math.random());
// change step

// move fruit down by one step evry 10 ms
action = setInterval(function(){

// move fruit by one step
$("#fruit1").css('top', $("#fruit1").position().top + step);


// check if fruit is too low
if($("#fruit1").position().top > $("#fruitsContainer").height()){
    // check any trials left
    if(trialsLeft > 1){
            // generate a fruit
// $("#fruitsContainer").append('<img src="images/Apple.png" class="fruit">'); 
        $("#fruit1").show();
        chooseFruit();// choose random fruit
        $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});
// random position

// generate a random step
step = 1+ Math.round(5*Math.random());
// change step

//reduce trials left
    trialsLeft --;

    // populate trails left box
    addHearts()

    }else{ // Game Over
        playing = false; // we are not play anymore
        $("#startreset").html("Start Game"); // change button to Start Game
        $("#gameOver").show();
        $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
        $("#trialsLeft").hide();
        stopAction();

    }
}
},10);
}

// generate  a random fruit
function chooseFruit(){
$("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())] + '.png');
}
// Stop droping 

function stopAction(){
clearInterval(action);
$("#fruit1").hide();
}
});