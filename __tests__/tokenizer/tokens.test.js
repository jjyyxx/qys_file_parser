describe('Test all tokens', () => {
    const module = require('../../output/index')
    const Tokenizer = module.Tokenizer
    const TokenType = module.TokenType
    const PairType = module.PairType
    const Detokenizer = module.Detokenizer
    it('deals with Appoggiatura correctly', () => {
        const str = '(1^)'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(3)
        expect(result[0].type).toBe(TokenType.AppoggiaturaBound)
        expect(result[0].leftOrRight).toBe(PairType.Left)
        expect(result[1].type).toBe(TokenType.Staff)
        expect(result[1].oriPitchLiteral).toBe(1)
        expect(result[2].type).toBe(TokenType.AppoggiaturaBound)
        expect(result[2].leftOrRight).toBe(PairType.Right)
    })

    it('deals with Chord correctly', () => {
        const str = '1&2&3'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(5)
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[1].type).toBe(TokenType.Chord)
        expect(result[2].type).toBe(TokenType.Staff)
        expect(result[2].oriPitchLiteral).toBe(2)
        expect(result[3].type).toBe(TokenType.Chord)
        expect(result[4].type).toBe(TokenType.Staff)
        expect(result[4].oriPitchLiteral).toBe(3)
    })

    it('deals with Comment correctly', () => {
        const str = '1//hehe\n2'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(3)
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[1].type).toBe(TokenType.Comment)
        expect(result[1].comment).toBe('hehe')
        expect(result[2].type).toBe(TokenType.Staff)
        expect(result[2].oriPitchLiteral).toBe(2)
    })

    it('deals with MeasureBound correctly', () => {
        const str = '12|34'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(5)
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[1].type).toBe(TokenType.Staff)
        expect(result[1].oriPitchLiteral).toBe(2)
        expect(result[2].type).toBe(TokenType.MeasureBound)
        expect(result[3].type).toBe(TokenType.Staff)
        expect(result[3].oriPitchLiteral).toBe(3)
        expect(result[4].type).toBe(TokenType.Staff)
        expect(result[4].oriPitchLiteral).toBe(4)
    })

    it('deals with RepeatBound correctly', () => {
        const str = '1||:23:||4'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(6)
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[1].type).toBe(TokenType.RepeatBound)
        expect(result[1].leftOrRight).toBe(PairType.Left)
        expect(result[2].type).toBe(TokenType.Staff)
        expect(result[2].oriPitchLiteral).toBe(2)
        expect(result[3].type).toBe(TokenType.Staff)
        expect(result[3].oriPitchLiteral).toBe(3)
        expect(result[4].type).toBe(TokenType.RepeatBound)
        expect(result[4].leftOrRight).toBe(PairType.Right)
        expect(result[5].type).toBe(TokenType.Staff)
        expect(result[5].oriPitchLiteral).toBe(4)
    })

    it('deals with RepeatSkip correctly', () => {
        const str = '[1.2.][3.4.5.]'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(2)
        expect(result[0].type).toBe(TokenType.RepeatSkip)
        expect(result[0].parts).toEqual([1, 2])
        expect(result[1].type).toBe(TokenType.RepeatSkip)
        expect(result[1].parts).toEqual([3, 4, 5])
    })

    it('deals with Setting correctly', () => {
        const str = '<180><180.0><3/4><1=C><1=bB,\',,>'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(5)
        expect(result[0].type).toBe(TokenType.Setting)
        expect(result[0].settings).toEqual([{ key: 'Speed', value: 180 }])
        expect(result[0].type).toBe(TokenType.Setting)
        expect(result[1].settings).toEqual([{ key: 'Volume', value: 180 }])
        expect(result[0].type).toBe(TokenType.Setting)
        expect(result[2].settings).toEqual([{ key: 'Bar', value: 3 }, { key: 'Beat', value: 4 }])
        expect(result[0].type).toBe(TokenType.Setting)
        expect(result[3].settings).toEqual([{ key: 'Key', value: 0 }])
        expect(result[0].type).toBe(TokenType.Setting)
        expect(result[4].settings).toEqual([{ key: 'Key', value: -2 }, { key: 'Oct', value: -2 }])
    })

    it('deals with Staff correctly', () => {
        const str = '1234'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(4)
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[0].pitch).toBe(0)
        expect(result[0].beatCount).toBe(1)
        expect(result[1].type).toBe(TokenType.Staff)
        expect(result[1].oriPitchLiteral).toBe(2)
        expect(result[1].pitch).toBe(2)
        expect(result[1].beatCount).toBe(1)
        expect(result[2].type).toBe(TokenType.Staff)
        expect(result[2].oriPitchLiteral).toBe(3)
        expect(result[2].pitch).toBe(4)
        expect(result[2].beatCount).toBe(1)
        expect(result[3].type).toBe(TokenType.Staff)
        expect(result[3].oriPitchLiteral).toBe(4)
        expect(result[3].pitch).toBe(5)
        expect(result[3].beatCount).toBe(1)
    })

    it('deals with Suffix correctly', () => {
        const str = '1\'_2-..,..3b4#'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[0].pitch).toBe(12)
        expect(result[0].beatCount).toBe(0.5)
        expect(result[1].type).toBe(TokenType.Staff)
        expect(result[1].oriPitchLiteral).toBe(2)
        expect(result[1].pitch).toBe(-10)
        expect(result[1].beatCount).toBe(2 * 1.75 * 1.75)
        expect(result[2].type).toBe(TokenType.Staff)
        expect(result[2].oriPitchLiteral).toBe(3)
        expect(result[2].pitch).toBe(3)
        expect(result[2].beatCount).toBe(1)
        expect(result[3].type).toBe(TokenType.Staff)
        expect(result[3].oriPitchLiteral).toBe(4)
        expect(result[3].pitch).toBe(6)
        expect(result[3].beatCount).toBe(1)
    })

    it('deals with Terminal correctly', () => {
        const str = '1||'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(2)
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[1].type).toBe(TokenType.Terminal)
    })

    it('deals with Tie correctly', () => {
        const str = '1^2^3'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(5)
        expect(result[0].type).toBe(TokenType.Staff)
        expect(result[0].oriPitchLiteral).toBe(1)
        expect(result[1].type).toBe(TokenType.Tie)
        expect(result[2].type).toBe(TokenType.Staff)
        expect(result[2].oriPitchLiteral).toBe(2)
        expect(result[3].type).toBe(TokenType.Tie)
        expect(result[4].type).toBe(TokenType.Staff)
        expect(result[4].oriPitchLiteral).toBe(3)
    })

    it('deals with Tuplet correctly', () => {
        const str = '(5)12345'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result).toHaveLength(6)
        expect(result[0].type).toBe(TokenType.Tuplet)
        expect(result[0].count).toBe(5)
        expect(result[1].type).toBe(TokenType.Staff)
        expect(result[1].oriPitchLiteral).toBe(1)
        expect(result[2].type).toBe(TokenType.Staff)
        expect(result[2].oriPitchLiteral).toBe(2)
        expect(result[3].type).toBe(TokenType.Staff)
        expect(result[3].oriPitchLiteral).toBe(3)
        expect(result[4].type).toBe(TokenType.Staff)
        expect(result[4].oriPitchLiteral).toBe(4)
        expect(result[5].type).toBe(TokenType.Staff)
        expect(result[5].oriPitchLiteral).toBe(5)
    })

    it('deals with UnrecognizedToken correctly', () => {
        const str = 'a(<a>)(a^)()(<a><><8[][1.2][12315^34&2&3'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        const detokenizer = new Detokenizer(result)
        console.log(detokenizer.detokenize())
    })
})
