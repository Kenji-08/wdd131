// TODO:
// Get smaller images for performance
// Get images for ally and boss and boss bg
// Make it so the enemy container border turns red when fighting grey when not
// Decide if I want nav to be dropdown or not
// Make accessible (aria labels, alt text, etc)
// Do a final test

let player = {
    name: 'player',
    health: 120,
    maxHealth: 120,
    runAttempts: 3,
    potions: 1,
    currentEnemy: 'opening',
    pure: true,
    attack(amt){
        // apply damage
        this.health -= amt;
        if (this.health < 0) { this.health = 0; }

        // update UI
        document.querySelector(".player-health").innerHTML = "HP: " + this.health;

        // check for death
        if (this.health <= 0) {
            alert("You have been defeated... Game over.");
            window.location.href = "index.html";
        }
    },
    heal(){
        if (this.potions > 0){
            this.health += 30; this.potions-=1;
            if (this.health > this.maxHealth) this.health = this.maxHealth;
            document.querySelector(".potions").innerHTML = "Potions: " + this.potions;
        }
        else{alert("No more potions left!");}
    },
    run(){
        if (this.runAttempts > 0){
            constchance = getRandomInt(0,2);
            if (chance === 0){
                alert("You successfully ran away!");
                this.runAttempts = 3;
                advanceScene();
            }
            else{
                this.runAttempts -= 1;
                document.querySelector(".run").innerHTML = "Run attempts left: " + this.runAttempts;
            }
        }
        else{
            alert("No more run attempts left!");
        }
    }
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function advanceScene(){
    console.log("current enemy: " + player.currentEnemy);
    player.runAttempts = 3;
    player.potions += 1;
    player.health = player.maxHealth;

    switch(player.currentEnemy){
        case 'opening':
            player.currentEnemy = "kitsune";
            kitsune.dialogueIndex = 0;
            runSceneWithEnemy(kitsune);
            break;
        case 'kitsune':
            player.currentEnemy = "pretender";
            pretender.dialogueIndex = 0;
            runSceneWithEnemy(pretender);
            break;

        case 'pretender':
            player.currentEnemy = "oni";
            oni.dialogueIndex = 0;
            runSceneWithEnemy(oni);
            break;

        case 'oni':
            player.currentEnemy = "ally";
            ally.dialogueIndex = 0;
            runSceneWithEnemy(ally);
            break;

        case 'ally':
            player.currentEnemy = "boss";
            boss.dialogueIndex = 0;
            runSceneWithEnemy(boss);
            break;
        case 'boss': // TODO: implement good and bad endings
            player.currentEnemy = "chamber";
            runScene(chamber);
            break;
        case 'chamber':
            if (player.pure){
                player.currentEnemy = "goodEnding";
                runScene(goodEnding);
            }
            else{
                player.currentEnemy = "badEnding";
                runScene(badEnding);
            }
    }
}


let allInteractions = [
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
    { scene: "pretender", line: 2, text: "Just tell me what you need."},
    { scene: "oni", line: 0, text: "“GRAAAH!” The Oni roars, blocking your path. He attacks!"},
    { scene: "ally", line: 0, text: "You're hurt, and uncertain."},
    { scene: "ally", line: 1, text: "This place tests what your heart holds."},
    { scene: "ally", line: 2, text: "I will not harm you. I can help."},
    { scene: "boss", line: 0, text: "You have come far."},
    { scene: "boss", line: 1, text: "Not for glory… but for life."},
    { scene: "boss", line: 2, text: "Your actions have consequences and you will now be judged accordingly."},
    { scene: "chamber", line: 0, text: "You enter the final room, where the Elixir of Life rests upon a pedestal."},
    { scene: "chamber", line: 1, text: "You see an inscription on the wall."},
    { scene: "chamber", line: 2, text: "'Only those pure of heart may take the ultimate treasure one seeks.'"},
    { scene: "badEnding", line: 0, text: "As you grasp the Elixir, a dark aura envelops you."},
    { scene: "badEnding", line: 1, text: "Your selfish actions have cursed you."},
    { scene: "badEnding", line: 2, text: "You glance to the elixir now turning to dust in your hands."},
    { scene: "badEnding", line: 3, text: "You leave the dungeon with a deep sense of regret, your village still in peril, the village elders exile you for entering in the dungeon without permission and for disturbing the creatures within."},
    { scene: "goodEnding", line: 0, text: "You approach the Elixir with reverence."},
    { scene: "goodEnding", line: 1, text: "Your pure heart allows you to take it without harm."},
    { scene: "goodEnding", line: 2, text: "You feel a warm light as you hold the Elixir, knowing it will save your village."}
];

let openingInteractions = allInteractions.filter(i => i.scene === "opening");
let kistuneInteractions = allInteractions.filter(i => i.scene === "kitsune");
let pretenderInteractions = allInteractions.filter(i => i.scene === "pretender");
let oniInteractions = allInteractions.filter(i => i.scene === "oni");
let allyInteractions = allInteractions.filter(i => i.scene === "ally");
let bossInteractions = allInteractions.filter(i => i.scene === "boss");
let chamberInteractions = allInteractions.filter(i => i.scene === "chamber");
let badEndingInteractions = allInteractions.filter(i => i.scene === "badEnding");
let goodEndingInteractions = allInteractions.filter(i => i.scene === "goodEnding");

let opening = {
    bg: "village.jpg",
    dialogue: openingInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;
        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }
        else {advanceScene();}
    }
};

let kitsune = {
    bg: 'village.jpg',
    img: 'inari-kistune-large.jpg',
    name: 'Kitsune',
    health: "???",
    dialogue: kistuneInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;
        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }
        else {advanceScene();}
    }
};

let pretender = {
    bg: 'dungeon-bg-large.jpg',
    img: 'kappa-large.svg',
    name: 'Shiro',
    health: '100',
    enemyHasActed: false,
    dialogue: pretenderInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue() {
        this.dialogueIndex++;

        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }

        this.enemyHasActed = false;
        togglePlayerAll();
        connectActions(pretender);
        document.querySelector(".next-btn").classList.add("hidden");
    },
    attack(amt){
        // If player attacks BEFORE enemyHasActed, that is considered "attacking first" => breaks purity
        if (!this.enemyHasActed) {
            player.brokenPurityCount += 1;
        }

        if (this.health - amt > 0){
            toggleFightOn("You strike the pretender!");
            this.health -= amt;
            // pretender counterattacks lightly
            player.attack(10);
            document.querySelector(".enemy-health").innerHTML = "HP: " + this.health;
        }
        else{
            toggleFightOff("Shiro was defeated!");
            advanceScene();
            this.dialogueIndex = this.dialogue.length;
        }
    },
    reason(){
        // mark that enemy acted first in this branch
        this.enemyHasActed = true;
        toggleFightOn("Of course! Let me just— [The yokai backstabs you] You're too trusting!");
        player.attack(15);
    },
    playerHealed(){
        this.enemyHasActed = true;
        toggleFightOn("Nice. You won't need that for long.");
        player.attack(15);
    },
    playerRan(){
        this.enemyHasActed = true;
        toggleFightOn("Going somewhere?");
        player.attack(20);
        player.run();
    }
};

let oni = {
    bg: 'dungeon-bg-large.jpg',
    img: 'oni-large.jpg',
    alt: '',
    name: 'Oni',
    health: '150',
    enemyHasActed: false,
    dialogue: oniInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;
        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }
        
        this.enemyHasActed = true;
        togglePlayerAll();
        connectActions(oni);
        document.querySelector(".next-btn").classList.add("hidden");
        
        player.attack(15);
    },
    attack(amt){
        // Oni attacks first so player maintains purity
        if (this.health - amt > 0){
            toggleFightOn("RAAAAAAAAAHHHHHH!!!!!");
            this.health -= amt;
            
            player.attack(8);
            document.querySelector(".enemy-health").innerHTML = "HP: " + this.health;
        }
        else{
            toggleFightOff("Oni was defeated!");
            advanceScene();
            this.dialogueIndex = this.dialogue.length;
        }
    },
    reason(){
        
        this.enemyHasActed = true;
        toggleFightOn("RRRRAAAHHH!!!");
        player.attack(15);
    },
    playerHealed(){
        
        this.enemyHasActed = true;
        toggleFightOn("RAH!AAHHH!!!");
        player.attack(10);
    },
    playerRan(){
        this.enemyHasActed = true;
        toggleFightOn("You can't escape me!");
        player.attack(20);
        player.run();
    }
}

let ally = {
    bg: 'dungeon-bg-large.jpg',
    img: 'kodama-large.png',
    alt: '',
    name: 'Kodama',
    health: '20',
    enemyHasActed: false,
    dialogue: allyInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;

        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }

        this.enemyHasActed = false;
        togglePlayerAll();
        connectActions(ally);
        document.querySelector(".next-btn").classList.add("hidden");
    },
    attack(amt){
        player.pure = false;

        if (this.health - amt > 0){
            toggleFightOn("");
            this.health -= amt;
            player.attack(6);
            document.querySelector(".enemy-health").innerHTML = "HP: " + this.health;
        }
        else{
            toggleFightOff("\'...I see...\' Kodama was defeated!");
            advanceScene();
            this.dialogueIndex = this.dialogue.length;
        }
    },
    reason(){
        toggleFightOff("You listen. That is good. \nLet me ease your wounds. (Max HP increased!)");
        player.maxHealth += 50;
        advanceScene();
        this.dialogueIndex = this.dialogue.length;
    },
    playerHealed(){
        toggleFightOn("Take your time. I will wait.");
    },
    playerRan(){
        toggleFightOff("Go if you must. I wish you safety!");
        advanceScene();
        this.dialogueIndex = this.dialogue.length;
    }
}

let boss = {
    bg: 'darknest-dungeon-ruins-door.jpg',
    img: 'tengu-large.jpg',
    alt: '',
    name: 'Tengu',
    health: '200',
    enemyHasActed: false,
    dialogue: bossInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;

        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }

        this.enemyHasActed = false;
        togglePlayerAll();
        connectActions(boss);
        document.querySelector(".next-btn").classList.add("hidden");
        if (!player.pure){document.querySelector(".action3").classList.add("hidden");}

    },
    attack(amt){
        player.pure = false;

        if (this.health - amt > 0){
            toggleFightOn("This is the path you have chosen.");
            this.health -= amt;
            player.attack(10);
            document.querySelector(".enemy-health").innerHTML = "HP: " + this.health;
        }
        else{
            toggleFightOff("The guardian Tengu was defeated!");
            advanceScene();
            this.dialogueIndex = this.dialogue.length;
        }
    },
    reason(){
        toggleFightOff("You have shown mercy. You may pass.");
        setTimeout(() => {
            advanceScene();
            this.dialogueIndex = this.dialogue.length;
        }, 800);
    },
    playerHealed(){
        toggleFightOn("Prepare yourself!");
        player.attack(10);
    },
    playerRan(){
        toggleFightOn("THERE IS NO ESCAPE!");
        player.attack(15);
        player.runAttempts = "Not able to run";
        document.querySelector(".run").innerHTML = "Run attempts left: " + player.runAttempts;
    }

}

let chamber = {
    bg: 'darknest-dungeon-ruins-door.jpg',
    img: '',
    dialogue: chamberInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;
        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }

        advanceScene();
    }
}

let badEnding = {
    bg: 'darknest-dungeon-ruins-door.jpg',
    img: '',
    dialogue: badEndingInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;
        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }
        alert("You have been cursed for your selfish actions! Game over.");
        // Navigate to main page
        window.location.href = "index.html";
    }
}

let goodEnding = {
    bg: 'darknest-dungeon-ruins-door.jpg',
    img: '',
    dialogue: goodEndingInteractions.map(i => i.text),
    dialogueIndex: 0,
    nextDialogue(){
        this.dialogueIndex++;
        if (this.dialogueIndex < this.dialogue.length) {
            return;
        }

        alert("Congratulations! You have obtained the Elixir of Life and saved your village! Thank you for playing!");
        // Navigate to main page
        window.location.href = "index.html";
    }
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

function togglePlayerAll(){
    togglePlayer();
    toggleActions()
}

function toggleFightOn(message){
    document.querySelector(".dialogue").innerHTML = message;
    document.querySelector(".next-btn").classList.add("hidden");
}

function toggleFightOff(message){
    alert(message);
}

function toggleAll(){
    toggleEnemy();
    togglePlayer();
    toggleActions();
}

function runScene(card) {    
    card.dialogueIndex = 0;
    displayCard(card);
    displayNextDialogue(card);
}

function runSceneWithEnemy(card) {    
    // ensure the enemyHasActed flag is reset when entering a new enemy scene
    card.enemyHasActed = false;
    runScene(card);
    toggleEnemy();
}

function runSceneWithAll(card) {    
    card.dialogueIndex = 0;
    runScene(card);
    toggleAll();
}

function displayNextDialogue(card) {
    let nextBtn = document.querySelector(".next-btn");

    // Remove old listeners
    let newBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newBtn, nextBtn);

    newBtn.addEventListener("click", function () {
        card.nextDialogue();
        updateDialogue(card);
    });
}

function updateDialogue(card) {
    if (card.dialogueIndex < card.dialogue.length) {
        document.querySelector(".dialogue").innerHTML = card.dialogue[card.dialogueIndex];
    }
}


function connectActions(card){
    let attackBtn = document.querySelector(".action1");
    let healBtn = document.querySelector(".action2");
    let reasonBtn = document.querySelector(".action3");
    let runBtn = document.querySelector(".action4");
    attackBtn.addEventListener("click", function(){
        card.attack(20);
    });
    healBtn.addEventListener("click", function(){
        player.heal();
        card.playerHealed();
    });
    reasonBtn.addEventListener("click", function(){
        card.reason();
    });
    runBtn.addEventListener("click", function(){
        card.playerRan();
    });
}


function displayCard(card){
    let html = `<div class="enemy-section">
            <div class="enemy-images">
                <img src="images/${card.bg}" alt="enemy background image" class="enemy-bg">
                <img src="images/${card.img}" alt="enemy image" class="enemy-img hidden">
            </div>
            <div class="enemy-stats hidden">
                <p>${card.name}</p>
                <p class="enemy-health">HP: ${card.health}</p>
            </div>
        </div>
        <div class="story-section">
            <p class="dialogue">${card.dialogue[card.dialogueIndex]}</p>
            <button class="next-btn">Next</button>
        </div>
        <div class="player-section hidden">
            <div class="player-stats">
                <p>Tanaka</p>
                <p class="player-health">HP: ${player.health}</p>
                <p class="potions">Potions: ${player.potions}</p>
                <p class="run">Run attempts left: ${player.runAttempts}</p>
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

let scene = opening;

// Uncomment if debugging
// runSceneWithEnemy(scene);

// Comment if debugging
runScene(scene);

player.currentEnemy = "opening";
console.log("Starting enemy: " + player.currentEnemy);