const Potion = require('../lib/Potion')
const Character = require('./Character')

function Player(name = ''){
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);
  
  this.inventory = [new Potion('health'), new Potion()]; //creates an object whith a new health potion and a random potion
};

 //returns an object with various player properties
 Player.prototype.getStats = function() {
  return{
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };
}; 

// returns the inventory array or false if it is empty
Player.prototype.getInventory = function() {
  if(this.inventory.length) {
    return this.inventory;
  };
  return false;
};


Player.prototype.addPotion = function(potion) { //parameter 'potion' is being replaced by 'new Potion' in the test
  this.inventory.push(potion);
}

Player.prototype.usePotion = function(index) {
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

module.exports = Player




