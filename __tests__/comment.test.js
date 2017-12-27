describe('Test comment statement', () => {
    let Parser = require('../output/index.js')

    it('drop comments correctly', () => {
        const comment = '//asdcxzascx'
        const commentWithN = comment + '\n'

        let newParser = new Parser.qysFileParser(comment)
        let ret = newParser.parse()
        expect(ret.sections).toHaveLength(0)

        newParser = new Parser.qysFileParser(commentWithN)
        ret = newParser.parse()
        expect(ret.sections).toHaveLength(0)

        const content1 = '1-^1,.^1'
        const content2 = content1 + commentWithN
        const content3 = commentWithN + content1
        const content4 = `1-^1,${commentWithN}.^1`
        const content5 = `1-${commentWithN}^1,${commentWithN}${commentWithN}.^1`

        const newParser1 = new Parser.qysFileParser(content1)
        const ret1 = newParser1.parse()
        const newParser2 = new Parser.qysFileParser(content2)
        const ret2 = newParser2.parse()
        const newParser3 = new Parser.qysFileParser(content3)
        const ret3 = newParser3.parse()
        const newParser4 = new Parser.qysFileParser(content4)
        const ret4 = newParser4.parse()
        const newParser5 = new Parser.qysFileParser(content5)
        const ret5 = newParser5.parse()
        expect(ret1.sections).toEqual(ret2.sections)
        expect(ret1.sections).toEqual(ret3.sections)
        expect(ret1.sections).toEqual(ret4.sections)
        expect(ret1.sections).toEqual(ret5.sections)
    })
})
