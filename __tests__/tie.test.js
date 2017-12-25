describe('Test the tie ^', ()=>{
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
        expect(ret.ties[0].section).toBe(1)
      
        var s = new a.qysFileParser('1-^1,.^1')
        var ret = s.parse()
        expect(ret.ties[1].first).toBe(2)
        expect(ret.ties[1].last).toBe(3)
        expect(ret.ties[1].section).toBe(1)
      })
})