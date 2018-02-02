const GameCard = {
    faceImages : ["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg","images/7.jpg","images/8.jpg"],
    backImage : "images/cardBack.jpg",

    cardContainer : $("<div/>", {
        "class" : "card-container"
    }),
    
    cardImage : $("<img/>", {
        "class" : "game-card"
    })
};

let GameBoard = {

    maxCards : 16,
    clickedCards : [],
    gameActive : false,
    triesLeft : 0,
    timeLeft : "0:00",

    applyCards : function(){
        for(let i = 0; i < this.maxCards; i++){
            let card = GameCard.cardImage.clone().attr("src",GameCard.backImage);
            let cardWithContainer = GameCard.cardContainer.clone().append(card);
            $("#card-list").append(cardWithContainer);
        };
    }
};


let CountDownTimer = {
    timer: null,

    start : function(){
        timer = setInterval(this.tick,1000);
    },

    cancel : function(){
        clearInterval(timer);
    },

    tick : function(){
        if(GameBoard.gameActive != false){
            let splitTime = GameBoard.timeLeft.split(":");
            let minutes = parseInt(splitTime[0],10);
            let seconds = parseInt(splitTime[1],10);
            seconds -= 1;
            minutes = (seconds < 0) ? minutes-=1 : minutes;
            seconds = (seconds < 0) ? "59" : seconds;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
        
            if((minutes <= 0 && seconds <= 0)){
                clearInterval(this.timer);
                GameBoard.gameActive = false;

                $("#close-game").css("display","none");
                $("#replay-menu").css("display","block");
                $("#replay-menu").children().children("h1").text("Time's Up");
            }
            GameBoard.timeLeft = minutes + ":"+ seconds;
            
            $("#time").html(GameBoard.timeLeft)
        }
    
    }
};


function shuffleCards(colorList){
    const array = [];
    for (let i = 0; i <= colorList.length -1; i++){
        let randomColor = Math.floor(Math.random() * colorList.length);
        array[i] = colorList[randomColor];   
        
            for (let x = 0; x <= i-1; x++){
                if(array[x] === array[i]){
                    i--;
                }
        }            

    }
    return array;
};


function createRandomCardList(){
    var randomList = shuffleCards(GameCard.faceImages)
    .concat(shuffleCards(GameCard.faceImages));
    return randomList;
};



//Initialize game elements
let createColorList = createRandomCardList();
GameBoard.applyCards();
$("#close-game").css("display","none");
$("#replay-menu").css("display","none");
resetStatusValues();


function resetStatusValues(){
    $('#tries').text("?");
    $("#time").html("?")
};


//Unflip card after small delay
function unflipCard(cardSize,card){
    setTimeout(function()
    {
        $(card).animate({
        width : 0,
        marginLeft : cardSize / 2,
        marginRight : cardSize / 2
    },{

        complete : function(){
            $(card).attr("src", GameCard.backImage);
            $(card).animate({
                width : cardSize,
                marginLeft : 0,
                marginRight : 0,
            })
            GameBoard.clickedCards = [];
        }
    })
    },220);
};


function validateUserChoice(cardSize){
    if(!$(GameBoard.clickedCards[0]).is(":animated") && !$(GameBoard.clickedCards[1]).is(":animated")){
        if(GameBoard.clickedCards.length === 2){

            GameBoard.triesLeft--;

            if(GameBoard.gameActive){
                $('#tries').text(GameBoard.triesLeft);
            }

            if(GameBoard.triesLeft === 0){
                GameBoard.gameActive = false;
                $("#close-game").css("display","none");
                $("#replay-menu").css("display","block");
                $("#replay-menu").children().children("h1").text("Game Over");
            }

            if($(GameBoard.clickedCards[0]).attr("src") !== $(GameBoard.clickedCards[1]).attr("src")){
                unflipCard(cardSize,GameBoard.clickedCards[0]);
                unflipCard(cardSize,GameBoard.clickedCards[1]);

            }
            else if($(GameBoard.clickedCards[0]).attr("src") === $(GameBoard.clickedCards[1]).attr("src")) {
                $(GameBoard.clickedCards[0]).fadeTo('medium', 0).addClass("hidden");
                $(GameBoard.clickedCards[1]).fadeTo('medium', 0).addClass("hidden");


                if($(GameBoard.clickedCards[0], GameBoard.clickedCards[1]).css("opacity","0")){
                    GameBoard.clickedCards = [];
                    checkIfWon();
                }
            }
        }
    }
};


function checkIfWon(){
    if($(".hidden").length == GameBoard.maxCards){
        setTimeout(function() 
        {
            GameBoard.gameActive = false;
            $("#close-game").css("display","none");
            $("#replay-menu").css("display","block");
            $("#replay-menu").children().children("h1").text("You Won!");

        },500);
    }
};




function cardFlip(card,frontImg){
    const cardSize = 120;
    if($(card).attr("src") != frontImg && !$(card).is(":animated")){
        GameBoard.clickedCards.push(card);

    $(card).animate({
        width : 0,
        marginLeft : cardSize / 2,
        marginRight : cardSize / 2
    },{
        complete : function(){

            if(GameBoard.gameActive){
                $(card).attr("src", frontImg);
                
            }

            $(card).animate({
                width : cardSize,
                marginLeft : 0,
                marginRight : 0
            },{
                complete : function(){              
                    validateUserChoice(cardSize);
                }
            })
        }
    })
}
};


$(".game-card").on("click",function(){
    if(GameBoard.gameActive === true){
        let faceImage = createColorList[$('.game-card').index(this)];
        if(GameBoard.clickedCards.length !== 2){
            cardFlip(this,faceImage);
        }
    }
});

function unflipAllCards(){
    $(".game-card").attr("src",GameCard.backImage).css("opacity","").removeClass("hidden");
};


function setDifficulty(tries,time){
    GameBoard.triesLeft = tries;
    GameBoard.timeLeft = time;
};

function activateGame(){
    GameBoard.gameActive = true;
    $("#main-menu").css("display","none");
    $("#close-game").css("display","block");
    $('#tries').text(GameBoard.triesLeft);
    $("#time").html(GameBoard.timeLeft)
};

function stopGame(){
    GameBoard.gameActive = false; 
    GameBoard.clickedCards = [];
    $("#main-menu").css("display","block");
    $("#close-game").css("display","none");
    resetStatusValues();
};


$("#btn-easy").on("click",function(){
    createColorList = createRandomCardList();
    setDifficulty(40,"1:40")
    unflipAllCards();
    activateGame();
    CountDownTimer.start();
});


$("#btn-medium").on("click",function(){
    createColorList = createRandomCardList();
    setDifficulty(30,"1:00");
    unflipAllCards();
    activateGame();
    CountDownTimer.start();
});

$("#btn-hard").on("click",function(){
    createColorList = createRandomCardList();
    setDifficulty(16,"0:40")
    unflipAllCards();
    activateGame();
    CountDownTimer.start();
});

$("#btn-replay").on("click",function(){
    $("#replay-menu").css("display","none");
    stopGame();
    unflipAllCards();
    CountDownTimer.cancel();

});

$("#close-game").on("click",function(){
    stopGame();
    unflipAllCards();
    CountDownTimer.cancel();
});