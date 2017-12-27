describe('Test the % symbol', () => {
    const Parser = require('../output/index.js')

    it('deals with dup correctly', () => {
        // simple
        let newParser = new Parser.qysFileParser('1%')
        let ret = newParser.parse()
        expect(ret.sections[0].sequence[0]).toEqual(ret.sections[0].sequence[1])

        // previous suffix
        newParser = new Parser.qysFileParser('3-.-.._%')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[0]).toEqual(ret.sections[0].sequence[1])

        // latter suffix
        newParser = new Parser.qysFileParser('1-%_.')
        ret = newParser.parse()
        expect(ret.sections[0].sequence[1]._beatCount).toBe(1.5)

        // mutiple dup
        newParser = new Parser.qysFileParser('1-%_.%#-%,%_')
        ret = newParser.parse()
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
})
