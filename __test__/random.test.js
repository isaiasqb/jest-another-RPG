const randomNumber = require('../lib/random.js');

test('gets random number between 1 and 10', () => {
  expect(randomNumber()).toBeGreaterThanOrequal(1);
  expect(randomNumber()).toBeLessThanOrEqual(10);
});