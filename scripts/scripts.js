let maxCards = 16;

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