const GameCard = {
    faceImages : ["images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.png","images/8.png",
                  "images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.png","images/8.png"],
    
    backImage : "images/cardBack.png",

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

     applyCards : function(){
        for(let i = 0; i < this.maxCards; i++){
            let card = GameCard.cardImage.clone().attr("src",GameCard.backImage);
            let cardWithContainer = GameCard.cardContainer.clone().append(card);
            $("#card-list").append(cardWithContainer);
        };
    }
};




//Initialize game elements
GameBoard.applyCards();
GameBoard.gameActive = true;
GameBoard.triesLeft = 3;
$('#tries').text(GameBoard.triesLeft);



function unflipSelected(cardSize,card){
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
                alert("You lost (no tries remaining)");
            }

            if($(GameBoard.clickedCards[0]).attr("src") !== $(GameBoard.clickedCards[1]).attr("src")){
                unflipSelected(cardSize,GameBoard.clickedCards[0]);
                unflipSelected(cardSize,GameBoard.clickedCards[1]);
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
            alert("You won")

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
            $(card).attr("src", frontImg);
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
        let faceImage = GameCard.faceImages[$('.game-card').index(this)];
        if(GameBoard.clickedCards.length !== 2){
            cardFlip(this,faceImage);
        }
    }
});