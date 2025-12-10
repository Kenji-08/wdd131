    // TODO:
    // Finish Pretender
    // Start on other yokai
    // Get smaller images for performance
    // Add story JSONs
    // Make it so the enemy container border turns red when fighting grey when not
    // Decide if I want nav to be dropdown or not
    // And much more...

    let player = {
        name: 'player',
        health: 100,
        runAttempts: 3,
        potions: 3,
        currentEnemy: 'opening', // Change when needed
        pure: true,
        attack(amt){
            if (this.health - amt <= 0){
                alert("You have been defeated! Game over.");
                location.reload();
            }
            this.health -= amt;
            if (this.health < 0){this.health = 0;}
            document.querySelector(".player-health").innerHTML = "HP: " + this.health;
        },
        heal(){
            if (this.potions > 0){
                this.health += 20; this.potions-=1;
                document.querySelector(".potions").innerHTML = "Potions: " + this.potions;
            }
            else{alert("No more potions left!");}
        },
        run(){
            if (this.runAttempts > 0){
                chance = getRandomInt(0,2);
                if (chance === 0){
                    alert("You successfully ran away!");
                    this.runAttempts = 3; // TODO: might remove
                    advanceEnemy();
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
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    function advanceEnemy(){
        console.log("current enemy: " + player.currentEnemy);
        player.runAttempts = 3;
        player.potions += 3;
        player.health = 100;

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
        }
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
        { scene: "pretender", line: 2, text: "Just tell me what you need."},
        { scene: "oni", line: 0, text: "“GRAAAH!” The Oni roars, blocking your path."}

    ];

    let openingInteractions = allInteractions.filter(i => i.scene === "opening");
    let kistuneInteractions = allInteractions.filter(i => i.scene === "kitsune");
    let pretenderInteractions = allInteractions.filter(i => i.scene === "pretender");
    let oniInteractions = allInteractions.filter(i => i.scene === "oni");

    let opening = {
        bg: "village.jpg",
        dialogue: openingInteractions.map(i => i.text),
        dialogueIndex: 0,
        nextDialogue(){
            this.dialogueIndex++;
            if (this.dialogueIndex < this.dialogue.length) {
                return;
            }
            else {advanceEnemy();}
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

            else {advanceEnemy();}
        }
    }

    let pretender = {
        bg: 'dungeon-bg-large.jpg',
        img: 'kappa-large.svg',
        name: 'Shiro',
        health: '100',
        dialogue: pretenderInteractions.map(i => i.text),
        dialogueIndex: -1,
        nextDialogue() {
            this.dialogueIndex++;

            if (this.dialogueIndex < this.dialogue.length) {
                return;
            }

            togglePlayerAll();
            connectActions(pretender);
            document.querySelector(".next-btn").classList.add("hidden");
        },
        attack(amt){
            if (this.health - amt > 0){
                toggleFightOn("Haha… I knew you'd try that!");
                this.health -= amt;
                player.attack(15);
                document.querySelector(".enemy-health").innerHTML = "HP: " + this.health;

                if (this.health === 80 && player.pure) {
                    player.pure = false;
                }
            }
            else{
                toggleFightOff("Shiro was defeated!");
                advanceEnemy();
                this.dialogueIndex = this.dialogue.length;
            }
        },
        reason(){
            toggleFightOn("Of course! Let me just-, [The yokai backstabs you] You're too trusting!")
            player.attack(30);
        },
        playerHealed(){
            toggleFightOn("Nice. You won't need that for long.")
            player.attack(30);
        },
        playerRan(){
            toggleFightOn("Going somewhere?");
            player.attack(40);
            player.run();
        }
    }

    let oni = {
        bg: 'dungeon-bg-large.jpg',
        img: 'oni-large.jpg',
        alt: '',
        name: 'Oni',
        health: '150',
        dialogue: oniInteractions.map(i => i.text),
        dialogueIndex: 0,
        nextDialogue(){
            this.dialogueIndex++;

            if (this.dialogueIndex < this.dialogue.length) {
                return;
            }

            togglePlayerAll();
            connectActions(pretender);
            document.querySelector(".next-btn").classList.add("hidden");
        },
        attack(amt){
            if (this.health - amt > 0){
                toggleFightOn("RAAAAAAAAAHHHHHH!!!!!");
                this.health -= amt;
                player.attack(10);
                document.querySelector(".enemy-health").innerHTML = "HP: " + this.health;
                if (this.health === 130 && player.pure){
                    player.pure = false;
                }
            }
            else{
                toggleFightOff("Oni was defeated!");
                this.dialogueIndex = 3;
            }
        },
        reason(){
            toggleFightOn("RRRRAAAHHH!!!")
            player.attack(30);
        },
        playerHealed(){
            toggleFightOn("RAH!AAHHH!!!");
            player.attack(15);
        },
        playerRan(){
            toggleFightOn("You can't escape me!");
            player.attack(40);
            player.run();
        }
    }

    let ally = {
        bg: 'dungeon-bg-large.jpg',
        img: '',
        alt: '',
        name: 'Kodama',
        health: '100',
    }

    let boss = {
        bg: '',
        img: '',
        alt: '',
        name: 'Tengu',
        health: '200',
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
        document.querySelector(".dialogue").innerHTML = message;
        document.querySelector(".next-btn").classList.remove("hidden");
    }

    function toggleAll(){
        toggleEnemy();
        togglePlayer();
        toggleActions();
    }

    runScene(opening);
    // runSceneWithEnemy(pretender);

    function runScene(card) {    
        card.dialogueIndex = 0;
        displayCard(card);
        displayNextDialogue(card);
    }


    function runSceneWithEnemy(card) {    
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
            document.querySelector(".dialogue").innerHTML =
                card.dialogue[card.dialogueIndex];
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