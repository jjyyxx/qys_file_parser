describe('Tokenizer', () => {
    it('works', () => {
        const Global = require('../../output/Global').Global
        const Tokenizer = require('../../output/index').Tokenizer
        const str =
`//东方红
//陕北民歌
<1=F><2/4><90>
(3)1_2_3_1|(.)22|55_^6_|2-|11_^6,_|2-|55|6_^1'_6_5_|11_^6,_|2-|52|17,_^6,_|5,5|23_2_|11_^6,_|2_3_2_1_|2_^1_7,_^6,_|5,-^|5,0||`
        Global.CurrentFormat = 'qym'
        const t = new Tokenizer(str)
        const result = t.tokenize()
        // console.log(result.Sections[0])
        console.log(result.Sections[0])

        const Detok = require('../../output/Detokenizer').Detokenizer
        const d = new Detok(result)
        console.log(d.detokenize())
    })
})
