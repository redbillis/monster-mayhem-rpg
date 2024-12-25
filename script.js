import Weapon from "./classes/weapon.js";
import Player from "./classes/player.js";
import Inventory from "./classes/inventory.js";
import Enemy from "./classes/enemy.js";

alert(
  "This project is under development. You will notice bugs and things that don't make sense. They will all be solved as project continues. Thank you for playing!"
);

// Weapon(name, damage, price)
const dagger = new Weapon("Dagger", 4, 1);
const handAxe = new Weapon("Handaxe", 6, 25);
const longsword = new Weapon("Longsword", 8, 30);
const greatsword = new Weapon("Greatsword", 12, 40);

const weapons = [dagger, handAxe, longsword, greatsword];

// Player(name, hp, xp, armorClass, attack, gold)
const red = new Player("Red", 100, 0, 15, 3, 50);
red.sayHi();

// Inventory(owner,gold, weapon)
const redInventory = new Inventory(red.name, red.gold, dagger);
console.log(redInventory);

// Enemy(name, armorClass, hitPoints, attack, xp, gold)
const wolf = new Enemy("Wolf", 13, 11, 4, 50, 3);
const skeleton = new Enemy("Skeleton", 13, 13, 4, 50, 5);
const ooze = new Enemy("Ooze", 8, 22, 3, 100, 7);

const enemies = [wolf, skeleton, ooze];

// const imp = new Enemy("Imp", 13, 10, 5, 200, 10);
// const bear = new Enemy("Bear", 11, 34, 5, 200, 12);
// const owlbear = new Enemy("Owl Bear", 13, 59, 14, 700, 15);
// const blackDragon = new Enemy("Black Dragon", 18, 127, 40, 2900, 50);
// const horndedDevil = new Enemy("Hornded Devil", 18, 178, 30, 7200, 100);

let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = [weapons[currentWeaponIndex].name];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const playerNameText = document.querySelector("#playerNameText");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const armorClassText = document.querySelector("#armorClassText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weaponNameText = document.querySelector("#weaponNameText");

playerNameText.innerText = red.name;
armorClassText.innerHTML = red.armorClass;
weaponNameText.innerText = weapons[currentWeaponIndex].name;
goldText.innerText = redInventory.gold;

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight Ooze"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight Wolf", "Fight Skeleton", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the monsters! YOU WIN THE GAME! &#x1F389;",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Movement Actions
function update(location) {
  monsterStats.style.display = "none";

  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

// Store Actions
function buyHealth() {
  if (redInventory.gold >= 10) {
    redInventory.gold -= 10;
    red.hp += 10;

    goldText.innerText = redInventory.gold;
    healthText.innerText = red.hp;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (redInventory.gold >= 30) {
    redInventory.addWeapon(weapons[currentWeaponIndex + 1]);
    console.log(redInventory);

    currentWeaponIndex++;

    let newWeapon = weapons[currentWeaponIndex].name;

    goldText.innerText = redInventory.gold;
    text.innerText = "You now have a " + newWeapon + ".";

    inventory.push(newWeapon);

    weaponNameText.innerText = inventory;
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "You do not have enough gold to buy a weapon.";
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;

    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Fighting Actions
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = enemies[fighting].hitPoints;
  monsterStats.style.display = "flex";

  monsterName.innerText = enemies[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = `The ${enemies[fighting].name} attacks.`;
  let enemyDamage = 0;
  let playerDamage = 0;

  const enemyD20Roll = enemies[fighting].d20RollAttack();
  console.log("Enemy rolled: " + enemyD20Roll);

  // Enemy's Attack
  if (enemyD20Roll >= red.armorClass && 1 < enemyD20Roll && enemyD20Roll < 20) {
    text.innerText += `The ${enemies[fighting].name} hits.`;
    enemyDamage = enemies[fighting].attack;
    console.log(enemyDamage);

    red.hp -= enemyDamage;
  } else if (enemyD20Roll === 20) {
    text.innerText += `The ${enemies[fighting].name} hits and deals critical damage.`;
    enemyDamage = enemies[fighting].attack * 2;
    console.log(enemyDamage);

    red.hp -= enemyDamage;
  } else if (enemyD20Roll > 20) {
    text.innerText += `The ${enemies[fighting].name} hits.`;
    enemyDamage = enemies[fighting].attack;
    console.log(enemyDamage);

    red.hp -= enemyDamage;
  } else {
    text.innerText += `The ${enemies[fighting].name} misses.`;
  }

  // Player's Attack
  const playerD20Roll = red.d20RollAttack();
  console.log("Player rolled: " + playerD20Roll);

  if (
    playerD20Roll >= enemies[fighting].armorClass &&
    1 < playerD20Roll &&
    playerD20Roll < 20
  ) {
    text.innerText += ` ${red.name} hits.`;
    playerDamage = weapons[currentWeaponIndex].damage;
    console.log(playerDamage);
    monsterHealth -= playerDamage;
  } else if (playerD20Roll === 20) {
    text.innerText += ` ${red.name} hits and deals critical damage.`;
    playerDamage = weapons[currentWeaponIndex].damage * 2;
    console.log(playerDamage);
    monsterHealth -= playerDamage;
  } else if (playerD20Roll > 20) {
    text.innerText += ` ${red.name} hits.`;
    playerDamage = weapons[currentWeaponIndex].damage;
    console.log(playerDamage);
    monsterHealth -= playerDamage;
  } else {
    text.innerText += ` ${red.name} misses.`;
  }

  healthText.innerText = red.hp;
  monsterHealthText.innerText = monsterHealth;

  if (red.hp <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  // if (Math.random() <= 0.1 && inventory.length !== 1) {
  //   text.innerText += " Your " + inventory.pop() + " breaks.";
  //   currentWeaponIndex--;
  // }
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " + enemies[fighting].name + ".";
}

function defeatMonster() {
  redInventory.gold += Math.floor(enemies[fighting].gold * 6.7);
  red.xp += enemies[fighting].xp;

  goldText.innerText = redInventory.gold;
  xpText.innerText = red.xp;

  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  red.xp = 0;
  red.hp = 100;
  red.gold = 50;
  currentWeaponIndex = 0;
  inventory = [weapons[currentWeaponIndex].name];
  goldText.innerText = redInventory.gold;
  healthText.innerText = red.hp;
  xpText.innerText = red.xp;
  goTown();
}
