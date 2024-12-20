export default class Player {
  constructor(name, hp, xp, armorClass, attack, gold) {
    this.name = name;
    this.hp = hp;
    this.xp = xp;
    this.armorClass = armorClass;
    this.attack = attack;
    this.gold = gold;

    console.log(`${this.name} created`);
  }

  sayHi() {
    console.log(`Hello! I am ${this.name}`);
  }

  d20RollAttack() {
    return Math.floor(Math.random() * 20 + 1) + this.attack;
  }
}
