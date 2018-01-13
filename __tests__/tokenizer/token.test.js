describe('Tokenizer', () => {
    it('works', () => {
        const Tokenizer = require('../../output/index').Tokenizer
        const str = `//东方红
//陕北民歌
<1=F><2/4><90>
55_^6_||
55_^6_||

55_^6_||`
        const t = new Tokenizer(str)
        const result = t.tokenize()
        console.log(result)
    })
})
