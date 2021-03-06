// dependencies needed
const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');

class Game {
  constructor(){
  this.roundNumbber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
};

initializeGame() {
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));

  this.currentEnemy = this.enemies[0];

  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    })
    // destructure the name form the promt
    //The function keyword would have created a new lexical scope, arrow function referes to the Game
      .then(({ name }) => {
      this.player = new Player(name);

      this.startNewBattle()
    })
};


//Establish who will take their turn first based on their agility values.
startNewBattle() {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  //get the player stats
  console.log('Your stats are as follows:')
  console.table(this.player.getStats());
  //get the description from the enemy
  console.log(this.currentEnemy.getDescription())

  this.battle()
}

//battle event, either on player's turn or enemie's turn
battle() {
  if (this.isPlayerTurn) {
    inquirer
    .prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['Attack', 'Use Potion']
    })
    .then(({ action }) => {
      if(action === 'Use Potion'){
        //Follow-up promt when you choose to take a potion
        if(!this.player.getInventory()) {
          console.log("you don't have any potions");
          return this.checkEndOfBattle();
        }

        inquirer
        .prompt({
          type: 'list',
          message: 'Which potion would you like to use?',
          name: 'action',
          //using map() to display a list of items and names(adding +1 to the index)
          choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
        })
        .then(({ action }) => {
          const potionDetails = action.split(': ');
          this.player.usePotion(potionDetails[0] - 1);
          console.log(`You used a ${potionDetails[1]} potion`);

          this.checkEndOfBattle()
        })

      } else {
        const damage = this.player.getAttackValue();
        this.currentEnemy.reduceHealth(damage);

        console.log(`You attacked the ${this.currentEnemy.name}`)
        console.log(this.currentEnemy.getHealth())

        this.checkEndOfBattle()
      }
    })
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You have been attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth())

    this.checkEndOfBattle()
  }
}


//check for the end of battle
checkEndOfBattle() {
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } 
  // Player is still alive but the Enemy has been defeated.
  else if (this.player.isAlive() && !this.currentEnemy.isAlive()){
    console.log(`You've defeated the ${this.currentEnemy.name}`);
    //player is awarded a potion
    this.player.addPotion(this.currentEnemy.potion);
    console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
    
    //goes to the next round number if there are still more enemies to fight
    this.roundNumbber++;
    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log('You win!');
    }
  }
  // player might have been defeated
  else {
    console.log("You've been defeated!")
  }
};
}

module.exports = Game;


