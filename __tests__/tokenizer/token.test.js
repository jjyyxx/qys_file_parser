describe('Tokenizer', () => {
    it('works', () => {
        const Global = require('../../output/Global').Global
        const Tokenizer = require('../../output/index').Tokenizer
        const str =
`//宴会开始（小埋·鬼子电报员）
//三泽康広 曲
<1=C><4/4><84>
<Flute><1.0>1''__1''__1''_1''__1''__1''_1''__1''__1''_1''_1''__1''__|1''_1''_1''__1''__1''_1''__1''__1''_1''_0_\\
1'__1'__1'_1'__1'__1'_1'__1'__1'_1'_1'__1'__|1'_1'_1'__1'__1'_1'__1'__1'_1'_0_\\
1''__1''__1''_1''__1''__1''_1''__1''__1''_1''_1''__1''__|1''_1''_1''__1''__1''_1''__1''__1''_1''_0_\\
1'__1'__1'_1'__1'__1'_1'__1'__1'_1'_1'__1'__|1'_1'_1'__1'__1'_1'__1'__1'_1'_0_\\
1''__1''__1''_1''__1''__1''_1''__1''__1''_1''_1''__1''__|5'_5'_5'__5'__5'_5'__5'__5'_5'_0_\\
1'__1'__1'_1'__1'__1'_1'__1'__1'_1'_1'__1'__|5_5_5__5__5_5__5__5_5_0_\\
1''__1''__1''_1''__1''__1''_1''__1''__1''_1''_1''__1''__|5'_5'_5'__5'__5'_5'__5'__5'_5'_0_\\
1'__1'__1'_1'__1'__1'_1'__1'__1'_1'_1'__1'__|5_5_5__5__5_5__5__5_1'_0_\\
1''_5'_1''_5'__1''_5'_5'__1''_5'_|1''_5'__1''_5'__1''_5'_5'_1''_0_\\
1'_5_1'_5__1'_5_5__1'_5_|1'_5__1'_5__1'_5_5_1'_0_\\
1''_5'_1''_5'__1''_5'_5'__1''_5'_|1''_5'__1''_5'__1''_5'_5'_1''_0_\\
1'_5_1'_5__1'_5_5__1'_5_|1'_5__1'_5__1'_5_5_1_0_||
<Piano><0.5>0000|0000\\
0000|0000\\
0000|0000\\
0000|0000\\
6,,,__1,,__3,,__5,,__7,,,__2,,__4,,__6,,__1,,__3,,__5,,__7,,__2,,__4,,__6,,__1,__|5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__\\
6,,,__1,,__3,,__5,,__7,,,__2,,__4,,__6,,__1,,__3,,__5,,__7,,__2,,__4,,__6,,__1,__|5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__\\
6,,,__1,,__3,,__5,,__7,,,__2,,__4,,__6,,__1,,__3,,__5,,__7,,__2,,__4,,__6,,__1,__|5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__\\
6,,,__1,,__3,,__5,,__7,,,__2,,__4,,__6,,__1,,__3,,__5,,__7,,__2,,__4,,__6,,__1,__|5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__5,,__0\\
1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__|1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__\\
1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__|1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__\\
1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__|1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__\\
1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__|1,__1,__0__1,__1,__1,__0__1,__1,__1,__0__1,__1,_0_||`
        Global.CurrentFormat = 'qys'
        const t = new Tokenizer(str)
        const result = t.tokenize()
        // console.log(result.Sections[0])
        console.log(result.Sections[0], result.Sections[1], result.Sections[2])

        const Detok = require('../../output/Detokenizer').Detokenizer
        const d = new Detok(result)
        console.log(d.detokenize())
        throw ''
    })
})
