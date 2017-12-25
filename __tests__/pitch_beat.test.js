describe('Test basic pitch and beatCount notation', () => {
    it('properly deals with pitch modification', () => {
        var a = require('../output/index.js')

        // ori
        var s = new a.qysFileParser('1')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(0)

        // single
        s = new a.qysFileParser('3#')
        ret = s.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(5)

        s = new a.qysFileParser('4b')
        ret = s.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(4)

        s = new a.qysFileParser('4,')
        ret = s.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(-7)

        s = new a.qysFileParser("5'")
        ret = s.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(19)

        // combined
        s = new a.qysFileParser("3#'b")
        ret = s.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(16)

        s = new a.qysFileParser("3###")
        ret = s.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(7)

        // exchangable
        var s1 = new a.qysFileParser("3#'b")
        var s2 = new a.qysFileParser("3b#'")
        var s3 = new a.qysFileParser("3'#b")

        var ret1 = s1.parse()
        var ret2 = s2.parse()
        var ret3 = s3.parse()
        expect(ret1.sections[0].sequence[0].pitch).toBe(ret2.sections[0].sequence[0].pitch)
        expect(ret1.sections[0].sequence[0].pitch).toBe(ret3.sections[0].sequence[0].pitch)
    })

    it('properly deals with beatCount modification', () => {
        var a = require('../output/index.js')
      
        var s = new a.qysFileParser('1')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(1)
      
        var s = new a.qysFileParser('1-')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(2)
      
        var s = new a.qysFileParser('1_')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(0.5)
      
        var s = new a.qysFileParser('1.')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(1.5)
      
        var s = new a.qysFileParser('1...')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(1.875)
      
        var s = new a.qysFileParser('1.._')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(0.875)
      
        var s = new a.qysFileParser('1..-')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(2.75)
      
        var s = new a.qysFileParser('1-.-.._')
        var ret = s.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(3.5)
      })
})