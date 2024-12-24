export default class Inventory {
  constructor(owner, gold, weapon) {
    this.owner = owner; // Name of the player
    this.weapons = [weapon]; // Array to store weapons
    this.currentWeapon = null; // Track the equipped weapon
    this.gold = gold; // Initial gold of the player
  }

  addWeapon(weapon) {
    if (this.gold >= weapon.price) {
      this.weapons.push(weapon);
      this.gold -= weapon.price;
      console.log(`${weapon.name} added to inventory`);
    } else {
      console.log(`Not enough gold to buy ${weapon.name}`);
    }
  }
}
