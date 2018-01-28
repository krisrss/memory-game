let maxCards = 8;

const faceImages = ["images/1.png","images/2.png","images/3.png","images/4.png",
					"images/1.png","images/2.png","images/3.png","images/4.png"];




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



function cardFlip(card,frontImg){
    const cardSize = 120;

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
            })
        }
    })
};





$(".game-card").on("click",function(){
	let faceImage = faceImages[$('.game-card').index(this)];
	cardFlip(this,faceImage);
}); 