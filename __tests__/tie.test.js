describe('Test the tie ^', () => {
    const Parser = require('../output/index.js')

    it('deals with ties correctly', () => {
        // simple
        var newParser = new Parser.qysFileParser('11')
        var ret = newParser.parse()
        expect(ret.sections[0].sequence[0]).toEqual(ret.sections[0].sequence[1])

        newParser = new Parser.qysFileParser('1^1')
        ret = newParser.parse()
        expect(ret.ties[0].first).toBe(1)
        expect(ret.ties[0].last).toBe(2)
        expect(ret.ties[0].section).toBe(1)

        newParser = new Parser.qysFileParser('1-^1,.^1')
        ret = newParser.parse()
        expect(ret.ties[1].first).toBe(2)
        expect(ret.ties[1].last).toBe(3)
        expect(ret.ties[1].section).toBe(1)
    })
})
