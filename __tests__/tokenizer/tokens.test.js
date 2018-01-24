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
        expect(result.Sections[0].Tracks[0]).toHaveLength(1)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Appoggiatura)
        expect(result.Sections[0].Tracks[0][0].Notes).toHaveLength(1)
        expect(result.Sections[0].Tracks[0][0].Notes[0].Pitches[0].ScaleDegree).toBe(1)
    })

    it('deals with Chord correctly', () => {
        const str = '1&2&3'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(1)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][0].Pitches).toHaveLength(3)
    })

    it('deals with MeasureBound correctly', () => {
        const str = '12|34'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(5)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][0].Pitches[0].ScaleDegree).toBe(1)
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][1].Pitches[0].ScaleDegree).toBe(2)
        expect(result.Sections[0].Tracks[0][2].type).toBe(TokenType.MeasureBound)
        expect(result.Sections[0].Tracks[0][3].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][3].Pitches[0].ScaleDegree).toBe(3)
        expect(result.Sections[0].Tracks[0][4].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][4].Pitches[0].ScaleDegree).toBe(4)
    })

    it('deals with RepeatBound correctly', () => {
        const str = '1||:23:||4'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(6)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][0].Pitches[0].ScaleDegree).toBe(1)
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.RepeatBound)
        expect(result.Sections[0].Tracks[0][1].leftOrRight).toBe(PairType.Left)
        expect(result.Sections[0].Tracks[0][2].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][2].Pitches[0].ScaleDegree).toBe(2)
        expect(result.Sections[0].Tracks[0][3].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][3].Pitches[0].ScaleDegree).toBe(3)
        expect(result.Sections[0].Tracks[0][4].type).toBe(TokenType.RepeatBound)
        expect(result.Sections[0].Tracks[0][4].leftOrRight).toBe(PairType.Right)
        expect(result.Sections[0].Tracks[0][5].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][5].Pitches[0].ScaleDegree).toBe(4)
    })

    it('deals with RepeatSkip correctly', () => {
        const str = '[1.2.][3.4.5.]'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(2)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.RepeatSkip)
        expect(result.Sections[0].Tracks[0][0].parts).toEqual([1, 2])
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.RepeatSkip)
        expect(result.Sections[0].Tracks[0][1].parts).toEqual([3, 4, 5])
    })

    it('deals with Note correctly', () => {
        const str = '1234'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(4)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][0].Pitches[0].ScaleDegree).toBe(1)
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][1].Pitches[0].ScaleDegree).toBe(2)
        expect(result.Sections[0].Tracks[0][2].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][2].Pitches[0].ScaleDegree).toBe(3)
        expect(result.Sections[0].Tracks[0][3].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][3].Pitches[0].ScaleDegree).toBe(4)
    })

    /* it('deals with Suffix correctly', () => {
        const str = '1\'_3b4#'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][0].Pitches[0].ScaleDegree).toBe(1)
        expect(result.Sections[0].Tracks[0][0].beatCount).toBe(0.5)
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][1].Pitches[0].ScaleDegree).toBe(2)
        expect(result.Sections[0].Tracks[0][1].beatCount).toBe(2 * 1.75 * 1.75)
        expect(result.Sections[0].Tracks[0][2].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][2].Pitches[0].ScaleDegree).toBe(3)
        expect(result.Sections[0].Tracks[0][2].pitch).toBe(3)
        expect(result.Sections[0].Tracks[0][2].beatCount).toBe(1)
        expect(result.Sections[0].Tracks[0][3].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][3].Pitches[0].ScaleDegree).toBe(4)
        expect(result.Sections[0].Tracks[0][3].pitch).toBe(6)
        expect(result.Sections[0].Tracks[0][3].beatCount).toBe(1)
    }) */

    it('deals with Terminal correctly', () => {
        const str = '1||'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(2)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][0].Pitches[0].ScaleDegree).toBe(1)
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.Terminal)
    })

    it('deals with Tie correctly', () => {
        const str = '1^2^3'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(5)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][0].Pitches[0].ScaleDegree).toBe(1)
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.Tie)
        expect(result.Sections[0].Tracks[0][2].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][2].Pitches[0].ScaleDegree).toBe(2)
        expect(result.Sections[0].Tracks[0][3].type).toBe(TokenType.Tie)
        expect(result.Sections[0].Tracks[0][4].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][4].Pitches[0].ScaleDegree).toBe(3)
    })

    it('deals with Tuplet correctly', () => {
        const str = '(5)12345'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        expect(result.Sections[0].Tracks[0]).toHaveLength(6)
        expect(result.Sections[0].Tracks[0][0].type).toBe(TokenType.Tuplet)
        expect(result.Sections[0].Tracks[0][0].count).toBe(5)
        expect(result.Sections[0].Tracks[0][1].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][1].Pitches[0].ScaleDegree).toBe(1)
        expect(result.Sections[0].Tracks[0][2].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][2].Pitches[0].ScaleDegree).toBe(2)
        expect(result.Sections[0].Tracks[0][3].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][3].Pitches[0].ScaleDegree).toBe(3)
        expect(result.Sections[0].Tracks[0][4].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][4].Pitches[0].ScaleDegree).toBe(4)
        expect(result.Sections[0].Tracks[0][5].type).toBe(TokenType.Note)
        expect(result.Sections[0].Tracks[0][5].Pitches[0].ScaleDegree).toBe(5)
    })

    it('deals with UnrecognizedToken correctly', () => {
        const str = '<1=C,,,>a(<a>)(a^)()(<a><><8[][1.2][12315^34&2&3'
        const tokenizer = new Tokenizer(str)
        const result = tokenizer.tokenize()
        const detokenizer = new Detokenizer(result)
        console.log(detokenizer.detokenize())
    })
})
