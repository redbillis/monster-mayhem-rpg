export default class Enemy {
  constructor(name, armorClass, hitPoints, attack, xp, gold) {
    this.name = name;
    this.armorClass = armorClass;
    this.hitPoints = hitPoints;
    this.attack = attack;
    this.xp = xp;
    this.gold = gold;

    // console.log(`${this.name} spawned`);
  }

  sayHi() {
    console.log("Grrrr");
  }

  d20RollAttack() {
    return Math.floor(Math.random() * 20 + 1) + this.attack;
  }
}
