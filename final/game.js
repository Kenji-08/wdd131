// TODO:
// Get smaller images for performance
// Add story JSONs
// Make it so the enemy container border turns red when fighting grey when not
// Decide if I want nav to be dropdown or not
// And much more...

let player = {
    name: 'player',
    health: 100,
    runAttempts: 3,
    potions: 1,
    attack(amt){this.health -= amt;},
    heal(){
        if (potions > 0){
            health += 20; potions-=1;
        }
        else{alert("No more potions left!");}
    },
    run(){} // TODO:
}

let allInteractions = [ // TODO: add the rest of the lines
    { scene: "opening", line: 0, text: "The village suffers from a deadly fever."},
    { scene: "opening", line: 1, text: "Only one cure remains in legend — the Elixir of Life."},
    { scene: "opening", line: 2, text: "It lies within the forgotten dungeon beneath the ancient willow."},
    { scene: "opening", line: 3, text: "If you return empty-handed… the village has no chance."},
    { scene: "opening", line: 4, text: "You steel yourself and enter the grove at night."},
    { scene: "kitsune", line: 0, text: "So a human really walks into this place…"},
    { scene: "kitsune", line: 1, text: "This dungeon tests more than strength."},
    { scene: "kitsune", line: 2, text: "Some spirits will lie to you."},
    { scene: "kitsune", line: 3, text: "Some spirits will hurt you."},
    { scene: "kitsune", line: 4, text: "And one may help — if your heart can recognize them."},
    { scene: "kitsune", line: 5, text: "Remember: choices stain."},
    { scene: "kitsune", line: 6, text: "They always have a cost."},
    { scene: "pretender", line: 0, text: "Oh! A traveler? You look tired."},
    { scene: "pretender", line: 1, text: "No need for trouble. I can help you."},
    { scene: "pretender", line: 2, text: "Just tell me what you need."}
];

let openingInteractions = allInteractions.filter(i => i.scene === "opening");
let kistuneInteractions = allInteractions.filter(i => i.scene === "kitsune");

let opening = {
    bg: "village.jpg",
    dialogue: openingInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        if (this.dialogueIndex < 4){
            this.dialogueIndex += 1;
        }
        else {runSceneWithEnemy(kitsune);}
    }
};

let kitsune = {
    bg: 'village.jpg',
    img: 'inari-kistune-large.jpg',
    name: 'Kitsune',
    health: 100,
    dialogue: kistuneInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        if (this.dialogueIndex < 6){
            this.dialogueIndex += 1;
        }
        else {runSceneWithAll(pretender);}
    }
}

let pretender = {
    bg: '',
    img: '',
    name: '',
    health: ''
}

let nextBtn = document.querySelector(".next-btn");

function toggleEnemy(){
    let enemyImg = document.querySelector(".enemy-img");
    let enemyStats = document.querySelector(".enemy-stats");

    let check = enemyImg.classList.contains("hidden");
    if (check){
        enemyImg.classList.remove("hidden")
        enemyStats.classList.remove("hidden")
    }
    else{
        enemyImg.classList.add("hidden");
        enemyStats.classList.add("hidden")
    }
}

function togglePlayer(){
    let playerSection = document.querySelector(".player-section")

    let check = playerSection.classList.contains("hidden");
    if (check){
        playerSection.classList.remove("hidden");
    }
    else{
        playerSection.classList.add("hidden");
    }
}

function toggleActions(){
    let actions = document.querySelector(".actions");

    let check = actions.classList.contains("hidden");
    if (check){
        actions.classList.remove("hidden");
    }
    else{
        actions.classList.add("hidden");
    }
}

function toggleAll(){
    toggleEnemy();
    togglePlayer();
    toggleActions();
}

runScene(opening);
// runSceneWithEnemy(kitsune);

function runScene(card) {    
    displayCard(card);
    displayNextDialogue(card);
}

function runSceneWithEnemy(card) {    
    runScene(card);
    toggleEnemy();
}

function runSceneWithAll(card) {    
    runScene(card);
    toggleAll();
}

function displayNextDialogue(card) {
    let nextBtn = document.querySelector(".next-btn");
    nextBtn.addEventListener("click", function(){
        card.nextDialogue();
        document.querySelector(".dialogue").innerHTML = card.dialogue[card.dialogueIndex]
    });
    if (document.querySelector(".dialogue").innerHTML == "undefined"){
        talking = false;
    }
}



function displayCard(card){
    let html = `<div class="enemy-section">
            <div class="enemy-images">
                <img src="images/${card.bg}" alt="enemy background image" class="enemy-bg">
                <img src="images/${card.img}" alt="enemy image" class="enemy-img hidden">
            </div>
            <div class="enemy-stats hidden">
                <p>${card.name}</p>
                <p>HP: ${card.health}</p>
            </div>
        </div>
        <div class="story-section">
            <p class="dialogue">${card.dialogue[card.dialogueIndex]}</p>
            <button class="next-btn">Next</button>
        </div>
        <div class="player-section hidden">
            <div class="player-stats">
                <p>Player Name</p>
                <p>HP: 100</p>
                <p>Potions: 1</p>
                <p>Run attempts left: 3</p>
            </div>
        </div>
        <div class="actions hidden">
            <button class="action1">Attack</button>
            <button class="action2">Heal</button>
            <button class="action3">Reason</button>
            <button class="action4">Run</button>
        </div>`
    document.querySelector("main").innerHTML = html;
}