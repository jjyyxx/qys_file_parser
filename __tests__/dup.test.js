describe('Test the % symbol', ()=>{
    it("deals with dup correctly", ()=>{
        a = require('../output/index.js')
      
        // simple
        var s = new a.qysFileParser('1%')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]).toEqual(ret.sections[0].sequence[1])
      
        // previous suffix
        var s = new a.qysFileParser('3-.-.._%')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]).toEqual(ret.sections[0].sequence[1])
      
        // latter suffix
        var s = new a.qysFileParser('1-%_.')
        var ret = s.parse()
        expect(ret.sections[0].sequence[1]._beatCount).toBe(1.5)
      
        // mutiple dup
        var s = new a.qysFileParser('1-%_.%#-%,%_')
        var ret = s.parse()
        expect(ret.sections[0].sequence.length).toBe(5)
        expect(ret.sections[0].sequence[1].pitch).toBe(0)
        expect(ret.sections[0].sequence[2].pitch).toBe(1)
        expect(ret.sections[0].sequence[3].pitch).toBe(-11)
        expect(ret.sections[0].sequence[4].pitch).toBe(-11)
        expect(ret.sections[0].sequence[1]._beatCount).toBe(1.5)
        expect(ret.sections[0].sequence[2]._beatCount).toBe(2.5)
        expect(ret.sections[0].sequence[3]._beatCount).toBe(2.5)
        expect(ret.sections[0].sequence[4]._beatCount).toBe(1.25)
      })
      
      it('deals with ties correctly', ()=> {
        a = require('../output/index.js')
      
        // simple
        var s = new a.qysFileParser('11')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]).toEqual(ret.sections[0].sequence[1])
        
        var s = new a.qysFileParser('1^1')
        var ret = s.parse()
        expect(ret.ties[0].first).toBe(1)
        expect(ret.ties[0].last).toBe(2)
      
        var s = new a.qysFileParser('1-^1,.^1')
        var ret = s.parse()
        expect(ret.ties[1].first).toBe(2)
        expect(ret.ties[1].last).toBe(3)
      })
})