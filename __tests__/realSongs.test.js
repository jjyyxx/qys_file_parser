describe('Test real songs', () => {
    const Parser = require('../output/index.js')

    it('parse real songs correctly', () => {
        const str = `//东方红
//陕北民歌
<1=F><2/4><90>
55_^6_|2-|11_^6,_|2-|55|6_^1'_6_5_|11_^6,_|2-|52|17,_^6,_|5,5|23_2_|11_^6,_|2_3_2_1_|2_^1_7,_^6,_|5,-^|5,0||`
        const newParser = new Parser.qysFileParser(str)
        const ret = newParser.parse()
        console.log(JSON.stringify(ret))
    })
})
