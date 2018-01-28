const maxCards = 8;

const faceImages = ["images/1.png","images/2.png","images/3.png","images/4.png",
					"images/1.png","images/2.png","images/3.png","images/4.png"];
let clickedCards = [];


const cardContainer = $("<div/>", {
	"class" : "card-container"
});


const cardImage = $("<img/>", {
    "class" : "game-card"
});



for(let i = 0; i < maxCards; i++){
	let card = cardImage.clone().attr("src","images/cardBack.png");
	let cardWithContainer = cardContainer.clone().append(card);
	$("#card-list").append(cardWithContainer);
};



function validateUserChoice(cardSize){
    if(clickedCards.length === 2){
        if(!$(clickedCards[0]).is(":animated") && !$(clickedCards[1]).is(":animated")){
            unflipSelected(cardSize,clickedCards[0]);
            unflipSelected(cardSize,clickedCards[1]);

            clickedCards = [];
        }
    }
};


function unflipSelected(cardSize,card){
    $(card).animate({
        width : 0,
        marginLeft : cardSize / 2,
        marginRight : cardSize / 2
    },{
        complete : function(){
            this.src = "images/cardBack.png";
            $(card).animate({
                width : cardSize,
                marginLeft : 0,
                marginRight : 0,
            })
        }
    })
};

function cardFlip(card,frontImg){
    const cardSize = 120;
    clickedCards.push(card);


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
	let faceImage = faceImages[$('.game-card').index(this)];

    if(clickedCards.length !== 2){
        cardFlip(this,faceImage);
    };
}); 