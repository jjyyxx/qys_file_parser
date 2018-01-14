import { Tokenizer } from '../Tokenizer'
import { BaseToken } from './BaseToken.js'
import { Suffix } from './Suffix'
import { Token } from './TokenDecorator'
import { SuffixType, TokenType } from './TokenType'

@Token
class Note extends BaseToken {
    public static pattern = /^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*[.\-_]*/
    public static readonly pitchDict: { [key: number]: number } = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 }
    public Pitches: Array<{
        ScaleDegree: number,
        Suffix: Suffix[],
    }>
    public readonly Suffix: Suffix[]

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Note)
        const pitchPart = matched[0].match(/^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*/)[0]
        this.parsePitch(pitchPart)
        this.Suffix = Tokenizer.tokenize(matched[0].slice(pitchPart.length))
    }

    public parsePitch(pitchPart: string) {
        const pitches = pitchPart.split('&')
        this.Pitches = pitches.map((pitch) => {
            const index = pitch.search(/[0-7%]/)
            const scaleDegree = pitch.charAt(index)
            return {
                ScaleDegree: scaleDegree === '%' ? -1 : Number(scaleDegree),
                Suffix: Tokenizer.tokenize<Suffix>(pitch.slice(0, index) + pitch.slice(index + 1)),
            }
        })
    }

    public toString(): string {
        const prefixString = this
        const suffixString = this.Suffix.map((value) => value.toString()).reduce((pre, cur) => pre + cur, '')
        const pitchString = this.Pitches.map((pitch) => {
            const index = pitch.Suffix.findIndex((suffix) =>
                suffix.suffixType !== SuffixType.Flat && suffix.suffixType !== SuffixType.Sharp)
            return ''.concat(
                ...pitch.Suffix.slice(1, index).map((suffix) => suffix.toString()),
                pitch.ScaleDegree === -1 ? '%' : pitch.ScaleDegree.toString(),
                ...pitch.Suffix.slice(index).map((suffix) => suffix.toString()),
            )
        }).reduce((pre, cur) => `${pre}&${cur}`)
        return pitchString + suffixString
    }

    /*public get pitch(): number {
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
    }*/
}

export { Note }
