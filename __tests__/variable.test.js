describe('Test variable declaration', () => {
    it('takes variables correctly', () => {
        a = require('../output/index.js')

        var s = new a.qysFileParser('<180>')
        var ret = s.parse()
    })
})