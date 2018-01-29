const GameCard = {
    faceImages : ["images/1.png","images/2.png","images/3.png","images/4.png","images/1.png","images/2.png","images/3.png","images/4.png"],
    
    backImage : "images/cardBack.png",

    cardContainer : $("<div/>", {
        "class" : "card-container"
    }),
    
    cardImage : $("<img/>", {
        "class" : "game-card"
    })
};

let GameBoard = {

     maxCards : 8,
     clickedCards : [],

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


            if($(GameBoard.clickedCards[0]).attr("src") !== $(GameBoard.clickedCards[1]).attr("src")){
                unflipSelected(cardSize,GameBoard.clickedCards[0]);
                unflipSelected(cardSize,GameBoard.clickedCards[1]);
            }

            else if($(GameBoard.clickedCards[0]).attr("src") === $(GameBoard.clickedCards[1]).attr("src")) {
                $(GameBoard.clickedCards[0]).fadeTo('medium', 0).addClass("hidden");
                $(GameBoard.clickedCards[1]).fadeTo('medium', 0).addClass("hidden");
            };


            GameBoard.clickedCards = [];
        }
    }
};




function cardFlip(card,frontImg){
    const cardSize = 120;
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
};


$(".game-card").on("click",function(){
	let faceImage = GameCard.faceImages[$('.game-card').index(this)];

    if(GameBoard.clickedCards.length !== 2){
        cardFlip(this,faceImage);
    };
}); 