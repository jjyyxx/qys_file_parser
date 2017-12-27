describe('Test basic pitch and beatCount notation', () => {
    const Parser = require('../output/index.js')

    it('properly deals with pitch modification', () => {
        // ori
        let newParser = new Parser.qysFileParser('1')
        let ret = newParser.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(0)

        // single
        newParser = new Parser.qysFileParser('3#')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(5)

        newParser = new Parser.qysFileParser('4b')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(4)

        newParser = new Parser.qysFileParser('4,')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(-7)

        newParser = new Parser.qysFileParser("5'")
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(19)

        // combined
        newParser = new Parser.qysFileParser("3#'b")
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(16)

        newParser = new Parser.qysFileParser('3###')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0].pitch).toBe(7)

        // exchangable
        let newParser1 = new Parser.qysFileParser("3#'b")
        let newParser2 = new Parser.qysFileParser("3b#'")
        let newParser3 = new Parser.qysFileParser("3'#b")

        let ret1 = newParser1.parse()
        let ret2 = newParser2.parse()
        let ret3 = newParser3.parse()
        expect(ret1.sections[0].sequence[0].pitch).toBe(ret2.sections[0].sequence[0].pitch)
        expect(ret1.sections[0].sequence[0].pitch).toBe(ret3.sections[0].sequence[0].pitch)
    })

    it('properly deals with beatCount modification', () => {
        let newParser = new Parser.qysFileParser('1')
        let ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(1)

        newParser = new Parser.qysFileParser('1-')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(2)

        newParser = new Parser.qysFileParser('1_')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(0.5)

        newParser = new Parser.qysFileParser('1.')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(1.5)

        newParser = new Parser.qysFileParser('1...')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(1.875)

        newParser = new Parser.qysFileParser('1.._')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(0.875)

        newParser = new Parser.qysFileParser('1..-')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(2.75)

        newParser = new Parser.qysFileParser('1-.-.._')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]._beatCount).toBe(3.5)
    })
})
