let cardList = document.querySelector("#cardList");

let wizardCard = {
    img: 'archWizard.jpg',
    name: 'Bartholomew',
    class: 'Arch Wizard',
    level: 30,
    health: 100,
    attack(){
        if (this.health > 0) { this.health -= 20; console.log(this.health);}
        else {this.health = 0; alert('Character has died!');}
    },
    levelUp(){
        this.level += 1;
        this.health = 100;
    }
};

let html = `
    <div class="card">
        <img class="image" src="${wizardCard.img}">
        <h1 class="name">${wizardCard.name}</h1>
        <div class="stats">
            <p id="class">Class: ${wizardCard.class}</p>
            <p id="level">Level: ${wizardCard.level}</p>
            <p id="health">Health: ${wizardCard.health}</p>
            <div class="buttons">
                <button id="attackBtn">Attacked</button>
                <button id="levelBtn">Level Up</button>
            </div>
        </div>
    </div>
    `;


cardList.innerHTML = html;

document.querySelector('#attackBtn').addEventListener('click', () => {
    wizardCard.attack();
    document.querySelector('#health').textContent = "Health: " + wizardCard.health;
});

document.querySelector('#levelBtn').addEventListener('click', () => {
    wizardCard.levelUp();
    document.querySelector('#level').textContent = "Level: " + wizardCard.level;
    document.querySelector('#health').textContent = "Health: " + wizardCard.health;
});
