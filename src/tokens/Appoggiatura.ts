import { Tokenizer } from '../Tokenizer'
import { BaseToken } from './BaseToken'
import { Note } from './Note'
import { Token } from './TokenDecorator'
import { PairType, TokenType } from './TokenType'

@Token
class Appoggiatura extends BaseToken {
    public static pattern = /^\([^)]+\^\)/
    public notes: Note[]

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Appoggiatura)
        this.notes = Tokenizer.tokenize(matched[0].slice(1, -2))
    }

    public toString(): string {
        return `(${this.notes.map((note) => note.toString()).reduce((pre, cur) => pre + cur)}^)`
    }
}

export { Appoggiatura }
