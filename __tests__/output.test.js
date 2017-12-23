it('subtracts 5 - 1 to equal 4 in TypeScript', () => {
    var a = require('../output/staffUnit.js');
    var s = new a.staffUnit();
    expect(s.pitch).toBe(undefined);
  });

it('sad', () => {
  expect(5-2).toBe(3);
})