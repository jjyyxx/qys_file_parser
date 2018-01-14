describe('Tokenizer', () => {
    it('works', () => {
        const Tokenizer = require('../../output/index').Tokenizer
        const str =
`//东方红
//陕北民歌
<1=F><2/4><90>
5&6_^6_||
5_^6_||

5_^6_||`
        const t = new Tokenizer(str)
        const result = t.tokenize()
        console.log(JSON.stringify(result))    
    })
})
