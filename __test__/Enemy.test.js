
const Enemy = require("../lib/Enemy.js");
const Potion = require("../lib/Potion.js");

jest.mock('../lib/Potion.js')

test("get's enemy's health value", () =>{
  const enemy = new Enemy('goblin', 'sword');
  expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()))
})

test('checks if enemy is alive or not', () => {
  const enemy = new Enemy('goblin', 'sword');
  expect(enemy.isAlive()).toBeTruthy();
  enemy.health = 0;
  expect(enemy.isAlive()).toBeFalsy();
});

//verifies that a enemy's attack value is within range
test("gets enemy's attack value", () => {
  const enemy = new Enemy('goblin', 'sword');
  enemy.strength = 10;

  expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

//see if the correct amount of health is being subtracted from the enemy health property
test("substracts from enemy's health", () => {
  const enemy = new Enemy('goblin', 'sword');
  const oldHealth = enemy.health;
  enemy.reduceHealth(5);
  expect(enemy.health).toBe(oldHealth - 5);

  enemy.reduceHealth(99999);
  expect(enemy.health).toBe(0);
});

test('gests description of the Enemy', () => {
  const enemy = new Enemy('goblin','sword');

  expect(enemy.getDescrption()).toEqual(expect.stringContaining('goblin'));
  expect(enemy.getDescrption()).toEqual(expect.stringContaining('sword'));
});

