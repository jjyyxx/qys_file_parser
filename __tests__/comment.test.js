describe('Test comment statement', () => {
    it('drop comments correctly', () => {
        a = require('../output/index.js')

        comment = '//asdcxzascx'
        commentWithN = comment + '\n'

        var s = new a.qysFileParser(comment)
        var ret = s.parse()
        expect(ret.sections).toHaveLength(0)

        var s = new a.qysFileParser(commentWithN)
        var ret = s.parse()
        expect(ret.sections).toHaveLength(0)

        content1 = '1-^1,.^1'
        content2 = content1 + commentWithN
        content3 = commentWithN + content1 
        content4 = `1-^1,${commentWithN}.^1`
        content5 = `1-${commentWithN}^1,${commentWithN}${commentWithN}.^1`

        var s1 = new a.qysFileParser(content1)
        var ret1 = s1.parse()
        var s2 = new a.qysFileParser(content2)
        var ret2 = s2.parse()
        var s3 = new a.qysFileParser(content3)
        var ret3 = s3.parse()
        var s4 = new a.qysFileParser(content4)
        var ret4 = s4.parse()
        var s5 = new a.qysFileParser(content5)
        var ret5 = s5.parse()
        expect(ret1.sections).toEqual(ret1.sections)
        expect(ret1.sections).toEqual(ret3.sections)
        expect(ret1.sections).toEqual(ret4.sections)
        expect(ret1.sections).toEqual(ret5.sections)
    })
})