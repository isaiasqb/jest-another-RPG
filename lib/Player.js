const Potion = require('../lib/Potion')
const Character = require('./Character')

class Player extends Character{
  constructor(name = ""){
    // call parent constructor here:
    super(name);
    
    this.inventory = [new Potion('health'), new Potion()]; //creates an object whith a new health potion and a random potion
  }

  getStats() {
    return{
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  }

  getInventory(){
    if(this.inventory.length) {
      return this.inventory;
    };
    return false;
  }

  addPotion(potion) { //parameter 'potion' is being replaced by 'new Potion' in the test
    this.inventory.push(potion);
  }

  usePotion(index) {
    const potion = this.inventory.splice(index, 1)[0];
  
    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break
    }
  }

};

module.exports = Player




