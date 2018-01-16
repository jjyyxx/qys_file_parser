import { Global } from '../Global'
import { Tokenizer } from '../Tokenizer'
import { BaseToken } from './BaseToken.js'
import { Suffix } from './Suffix'
import { Token } from './TokenDecorator'
import { SuffixType, TokenType } from './TokenType'

@Token
class Note extends BaseToken {
    public static pattern = {
        qym: /^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*[.\-_]*/,
        qys: /^([0-7%xX][',b#]*|\[([0-7%xX][',b#]*)*\][',b#]*)[.\-_]*/,
    }
    public Pitches: Array<{
        ScaleDegree: number,
        Suffix: Suffix[],
    }>
    public readonly Suffix: Suffix[]

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Note)
        if (Global.CurrentFormat === 'qym') {
            const pitchPart = matched[0].match(/^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*/)[0]
            this.parseQymPitch(pitchPart)
            this.Suffix = Tokenizer.tokenize(matched[0].slice(pitchPart.length))
        } else {
            if (matched[0].startsWith('[')) {
                const pitchPart = matched[0].match(/^\[([0-7%xX][',b#]*)*\]/)[0].slice(1, -1)
                this.parseQysPitch(pitchPart)
                this.Suffix = Tokenizer.tokenize(matched[0].slice(pitchPart.length + 2))
            } else {
                const pitchPart = matched[0].charAt(0)
                this.Pitches.push({
                    ScaleDegree: pitchPart === '%' ? -1 :
                        (pitchPart === 'x' || pitchPart === 'X') ? 8 : Number(pitchPart),
                    Suffix: [],
                })
                this.Suffix = Tokenizer.tokenize(matched[0].slice(1))
            }
        }
    }

    public parseQymPitch(pitchPart: string) {
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

    public parseQysPitch(pitchPart: string) {
        const pitches: Array<{ ScaleDegree: number, Suffix: Suffix[] }> = []
        while (pitchPart.length > 0) {
            const matched = pitchPart.match(/^[0-7%xX][',b#]*/)
            pitches.push({
                ScaleDegree: pitchPart === '%' ? -1 :
                    (pitchPart === 'x' || pitchPart === 'X') ? 8 : Number(pitchPart),
                Suffix: Tokenizer.tokenize<Suffix>(matched[0].slice(1)),
            })
            pitchPart = pitchPart.slice(matched[0].length)
        }
        this.Pitches = pitches
    }

    public toString(): string {
        switch (Global.CurrentFormat) {
            case 'qym':
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
            case 'qys':
                if (this.Pitches.length === 1) {
                    const pitch = this.Pitches[0]
                    return ''.concat(
                        pitch.ScaleDegree === -1 ? '%' : pitch.ScaleDegree === 8 ? 'x' : pitch.ScaleDegree.toString(),
                        ...pitch.Suffix.map((suffix) => suffix.toString()),
                        ...this.Suffix.map((suffix) => suffix.toString()),
                    )
                } else {
                    return '['.concat(
                        ...this.Pitches.map((pitch) => {
                            return ''.concat(
                                pitch.ScaleDegree === -1 ? '%' :
                                    pitch.ScaleDegree === 8 ? 'x' : pitch.ScaleDegree.toString(),
                                ...pitch.Suffix.map((suffix) => suffix.toString()),
                            )
                        }), ']',
                        ...this.Suffix.map((suffix) => suffix.toString()),
                    )
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
