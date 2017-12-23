
it('properly map pitch', () => {
    var a = require('../output/staffUnit.js');
    var s = new a.staffUnit(1);
    expect(s.pitch).toBe(0);
    s = new a.staffUnit(2);
    expect(s.pitch).toBe(2);
    s = new a.staffUnit(3);
    expect(s.pitch).toBe(4);
    s = new a.staffUnit(4);
    expect(s.pitch).toBe(5);
    s = new a.staffUnit(5);
    expect(s.pitch).toBe(7);
    s = new a.staffUnit(6);
    expect(s.pitch).toBe(9);
    s = new a.staffUnit(7);
    expect(s.pitch).toBe(11);
  });

it('properly deals with pitch modification', () => {
  var a = require('../output/qysFileParser')

  // ori
  var s = new a.qysFileParser('1')
  var ret = s.parse()
  expect(ret.result[0].pitch).toBe(0)

  // single
  s = new a.qysFileParser('3#')
  ret = s.parse()
  expect(ret.result[0].pitch).toBe(5)

  s = new a.qysFileParser('4b')
  ret = s.parse()
  expect(ret.result[0].pitch).toBe(4)

  s = new a.qysFileParser('4,')
  ret = s.parse()
  expect(ret.result[0].pitch).toBe(-7)  
  
  s = new a.qysFileParser("5'")
  ret = s.parse()
  expect(ret.result[0].pitch).toBe(19)

  // combined
  s = new a.qysFileParser("3#'b")
  ret = s.parse()
  expect(ret.result[0].pitch).toBe(16)

  s = new a.qysFileParser("3###")
  ret = s.parse()
  expect(ret.result[0].pitch).toBe(7)

  // exchangable
  var s1 = new a.qysFileParser("3#'b")
  var s2 = new a.qysFileParser("3b#'")
  var s3 = new a.qysFileParser("3'#b")

  var ret1 = s1.parse()
  var ret2 = s2.parse()
  var ret3 = s3.parse()
  expect(ret1.result[0].pitch).toBe(ret2.result[0].pitch)
  expect(ret1.result[0].pitch).toBe(ret3.result[0].pitch)
})  





it('properly deals with beatCount modification', () => {
  var a = require('../output/qysFileParser')

  var s = new a.qysFileParser('1')
  var ret = s.parse()
  expect(ret.result[0]._beatCount).toBe(1)

  var s = new a.qysFileParser('1-')
  var ret = s.parse()
  expect(ret.result[0]._beatCount).toBe(2)

  var s = new a.qysFileParser('1_')
  var ret = s.parse()
  expect(ret.result[0]._beatCount).toBe(0.5)

  var s = new a.qysFileParser('1.')
  var ret = s.parse()
  ret.result[0].commit()
  expect(ret.result[0]._beatCount).toBe(1.5)
})