import { Global } from '../Global'
import { Tokenizer } from '../Tokenizer'
import { BaseToken } from './BaseToken.js'
import { Pitch } from './Pitch'
import { Suffix } from './Suffix'
import { Token } from './TokenDecorator'
import { SuffixType, TokenType } from './TokenType'

@Token
class Note extends BaseToken {
    public static pattern = {
        qym: /^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*[.\-_]*/,
        qys: /^([0-7%xX][',b#]*|\[([0-7%xX][',b#]*)*(\^[0-7%xX][',b#]*)?\][',b#]*)[.\-_`]*/,
    }
    public Pitches: Pitch[]
    public readonly Suffix: Suffix[]
    public Arpeggio: boolean = false

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Note)
        let note = matched[0]
        if (Global.CurrentFormat === 'qym') {
            const pitchPart = note.match(/^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*/)[0]
            this.parseQymPitch(pitchPart)
            this.Suffix = Tokenizer.tokenize(note.slice(pitchPart.length))
        } else {
            if (note.includes('^')) {
                this.Arpeggio = true
                note = note.replace('^', '')
            }
            if (note.startsWith('[')) {
                const pitchPart = note.match(/^\[([0-7%xX][',b#]*)*\]/)[0].slice(1, -1)
                this.parseQysPitch(pitchPart)
                this.Suffix = Tokenizer.tokenize(note.slice(pitchPart.length + 2))
            } else {
                const pitchPart = note.charAt(0)
                this.Pitches = [new Pitch(note.charAt(0))]
                this.Suffix = Tokenizer.tokenize(note.slice(1))
            }
        }
    }

    public parseQymPitch(pitchPart: string) {
        const pitches = pitchPart.split('&')
        this.Pitches = pitches.map((pitch) => new Pitch(pitch))
    }

    public parseQysPitch(pitchPart: string) {
        const pitches: Pitch[] = []
        while (pitchPart.length > 0) {
            const matched = pitchPart.match(Pitch.pattern.qys)
            pitches.push(new Pitch(matched[0]))
            pitchPart = pitchPart.slice(matched[0].length)
        }
        this.Pitches = pitches
    }

    public toString(): string {
        switch (Global.CurrentFormat) {
            case 'qym':
                const index = this.Suffix.findIndex((suffix) =>
                    suffix.suffixType !== SuffixType.Flat && suffix.suffixType !== SuffixType.Sharp)
                const prefixString = this.Suffix.slice(0, index)
                    .map((value) => value.toString()).reduce((pre, cur) => pre + cur, '')
                const suffixString = this.Suffix.slice(index)
                    .map((value) => value.toString()).reduce((pre, cur) => pre + cur, '')
                const pitchString = this.Pitches.map((pitch) => pitch.toString()).reduce((pre, cur) => `${pre}&${cur}`)
                return prefixString + pitchString + suffixString
            case 'qys':
                if (this.Pitches.length === 1) {
                    const pitch = this.Pitches[0]
                    return ''.concat(
                        pitch.toString(),
                        ...this.Suffix.map((suffix) => suffix.toString()),
                    )
                } else {
                    if (this.Arpeggio) {
                        return '['.concat(
                            ...this.Pitches.slice(0, -1).map((pitch) => pitch.toString()),
                            '^',
                            this.Pitches.last().toString(),
                            ']',
                            ...this.Suffix.map((suffix) => suffix.toString()),
                        )
                    } else {
                        return '['.concat(
                            ...this.Pitches.map((pitch) => pitch.toString()),
                            ']',
                            ...this.Suffix.map((suffix) => suffix.toString()),
                        )
                    }
                }
        }
    }

    /*public get pitch(): number {
        return this.calcPitch()
    }

    public get beatCount(): number {
        return this.calcBeat()
    }

    private calcPitch(): number {   TODO: improve pattern
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
    }*/
}

export { Note }
