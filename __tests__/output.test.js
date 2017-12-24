
it('properly map pitch', () => {
    var a = require('../output/StaffUnit.js');
    var s = new a.StaffUnit(1);
    expect(s.pitch).toBe(0);
    s = new a.StaffUnit(2);
    expect(s.pitch).toBe(2);
    s = new a.StaffUnit(3);
    expect(s.pitch).toBe(4);
    s = new a.StaffUnit(4);
    expect(s.pitch).toBe(5);
    s = new a.StaffUnit(5);
    expect(s.pitch).toBe(7);
    s = new a.StaffUnit(6);
    expect(s.pitch).toBe(9);
    s = new a.StaffUnit(7);
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
  expect(ret.result[0]._beatCount).toBe(1.5)

  var s = new a.qysFileParser('1...')
  var ret = s.parse()
  expect(ret.result[0]._beatCount).toBe(1.875)

  var s = new a.qysFileParser('1.._')
  var ret = s.parse()
  expect(ret.result[0]._beatCount).toBe(0.875)

  var s = new a.qysFileParser('1..-')
  var ret = s.parse()
  expect(ret.result[0]._beatCount).toBe(2.75)

  var s = new a.qysFileParser('1-.-.._')
  var ret = s.parse()
  expect(ret.result[0]._beatCount).toBe(3.5)
})

it("deals with dup correctly", ()=>{
  a = require('../output/qysFileParser')

  // simple
  var s = new a.qysFileParser('1%')
  var ret = s.parse()
  expect(ret.result[0]).toEqual(ret.result[1])

  // previous suffix
  var s = new a.qysFileParser('3-.-.._%')
  var ret = s.parse()
  expect(ret.result[0]).toEqual(ret.result[1])

  // latter suffix
  var s = new a.qysFileParser('1-%_.')
  var ret = s.parse()
  expect(ret.result[1]._beatCount).toBe(1.5)

  // mutiple dup
  var s = new a.qysFileParser('1-%_.%#-%,%_')
  var ret = s.parse()
  expect(ret.result.length).toBe(5)
  expect(ret.result[1].pitch).toBe(0)
  expect(ret.result[2].pitch).toBe(1)
  expect(ret.result[3].pitch).toBe(-11)
  expect(ret.result[4].pitch).toBe(-11)
  expect(ret.result[1]._beatCount).toBe(1.5)
  expect(ret.result[2]._beatCount).toBe(2.5)
  expect(ret.result[3]._beatCount).toBe(2.5)
  expect(ret.result[4]._beatCount).toBe(1.25)
})

it('deals with ties correctly', ()=> {
  a = require('../output/qysFileParser')

  // simple
  var s = new a.qysFileParser('11')
  var ret = s.parse()
  expect(ret.result[0]).toEqual(ret.result[1])
  
  var s = new a.qysFileParser('1^1')
  var ret = s.parse()
  expect(ret.ties[0].first).toBe(1)
  expect(ret.ties[0].last).toBe(2)

  var s = new a.qysFileParser('1-^1,.^1')
  var ret = s.parse()
  expect(ret.ties[1].first).toBe(2)
  expect(ret.ties[1].last).toBe(3)
})

it('parse real songs correctly', () => {
  a = require('../output/qysFileParser')

  var str = "55_^6_|2-|11_^6,_|2-|55|6_^1'_6_5_|11_^6,_|2-|52|17,_^6,_|5,5|23_2_|11_^6,_|2_3_2_1_|2_^1_7,_^6,_|5,-^|5,0||"
  var s = new a.qysFileParser(str)
  var ret = s.parse()
  console.log(JSON.stringify(ret))
})

it('takes variables correctly', () => {
  a = require('../output/qysFileParser')

  var s = new a.qysFileParser('<180>')
  var ret = s.parse()
})