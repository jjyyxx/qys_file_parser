import { Tokenizer } from '../Tokenizer'
import { BaseToken } from './BaseToken'
import { Note } from './Note'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Chord extends BaseToken {
    public static pattern = /^([0-7%][',b#\-_.]*&)+[0-7%][',b#\-_.]*/
    public notes: Note[]
    constructor(matched: RegExpMatchArray) {
        super(TokenType.Chord)
        this.notes = matched[0].split('&').map((note): Note[] => Tokenizer.tokenize(note))
            .reduce((pre, cur) => (pre.push(...cur), pre))
    }

    public toString(): string {
        let str = ''
        const length = this.notes.length - 1
        for (let i = 0; i < length; i++) {
            str += this.notes[i].toString() + '&'
        }
        return str + this.notes.last().toString()
    }
}

export { Chord }
