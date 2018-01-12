import { Tokenizer } from '../Tokenizer'
import { BaseToken } from './BaseToken.js'
import { Suffix } from './Suffix'
import { Token } from './TokenDecorator'
import { SuffixType, TokenType } from './TokenType'

@Token
class Note extends BaseToken {
    public static pattern = /^[0-7%][',b#\-_.]*/
    public static readonly pitchDict: { [key: number]: number } = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 }
    public isDuplicate: boolean
    public readonly isRest: boolean
    public readonly suffixes: Suffix[]
    public readonly oriPitchLiteral: number
    public oriPitch: number
    public oriBeatCount: number

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Note)
        this.oriPitchLiteral = 0
        this.oriBeatCount = 1
        this.isRest = false
        this.isDuplicate = false
        const note = matched[0]
        const pitch = note.charAt(0)
        switch (pitch) {
            case '0':
                this.isRest = true
                break
            case '%':
                this.isDuplicate = true
                break
            default:
                this.oriPitchLiteral = Number(pitch)
                break
        }
        this.oriPitch = Note.pitchDict[this.oriPitchLiteral]
        this.suffixes = Tokenizer.tokenize(note.slice(1))
    }

    public alterDup(pitch: number, beatCount: number) {
        this.oriPitch = pitch
        this.oriBeatCount = beatCount
        this.isDuplicate = false
    }

    public toString(): string {
        const suffixString = this.suffixes.map((value) => value.toString()).reduce((pre, cur) => pre + cur, '')
        if (this.isDuplicate) {
            return '%' + suffixString
        } else {
            return this.oriPitchLiteral.toString() + suffixString
        }
    }

    public get pitch(): number {
        return this.calcPitch()
    }

    public get beatCount(): number {
        return this.calcBeat()
    }

    private calcPitch(): number { // TODO: improve pattern
        let pitch = this.oriPitch
        this.suffixes.forEach((suffix) => {
            switch (suffix.suffixType) {
                case SuffixType.DotAbove:
                    pitch += 12
                    break
                case SuffixType.DotBelow:
                    pitch -= 12
                    break
                case SuffixType.Flat:
                    pitch -= 1
                    break
                case SuffixType.Sharp:
                    pitch += 1
                    break
                default:
                    break
            }
        })
        return pitch
    }

    private calcBeat(): number { // TODO: improve pattern
        let beatCount = this.oriBeatCount
        this.suffixes.forEach((suffix) => {
            switch (suffix.suffixType) {
                case SuffixType.Dash:
                    beatCount += 1
                    break
                case SuffixType.Underline:
                    beatCount /= 2
                    break
                case SuffixType.DotAfter:
                    beatCount *= 2 - Math.pow(2, - suffix.dotCount)
                    break
                default:
                    break
            }
        })
        return beatCount
    }
}

export { Note }
