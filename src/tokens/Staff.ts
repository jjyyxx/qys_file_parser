import { BaseToken } from './BaseToken.js'
import { DotAfter } from './DotAfter'
import { Suffix } from './Suffix'
import { SuffixType, TokenType } from './TokenType'

class Staff extends BaseToken {
    public static readonly pitchDict: { [key: number]: number } = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 }
    public readonly isDuplicate: boolean
    public readonly isRest: boolean
    public readonly suffixes: Suffix[]
    public readonly oriPitch: number

    constructor({
        pitch = 0,
        isRest = false,
        isDuplicate = false,
    }) {
        super(TokenType.Staff)
        this.oriPitch = pitch
        this.isRest = isRest
        this.isDuplicate = isDuplicate
        this.suffixes = []
    }

    public appendSuffix(suffix: Suffix) {
        const lastSuffix = this.suffixes.last()
        if (lastSuffix && lastSuffix.suffixType === SuffixType.DotAfter && suffix.suffixType === SuffixType.DotAfter) {
            (lastSuffix as DotAfter).increase()
        } else {
            this.suffixes.push(suffix)
        }
    }

    public toString(): string {
        return `${this.oriPitch}${this.suffixes.map((value) => value.toString()).reduce((pre, cur) => pre + cur, '')}`
    }

    public get pitch(): number {
        return this.calcPitch()
    }

    public get beatCount(): number {
        return this.calcBeat()
    }

    private calcPitch(): number { // TODO: improve pattern
        let pitch = Staff.pitchDict[this.oriPitch]
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
        let beatCount = 1
        this.suffixes.forEach((suffix) => {
            switch (suffix.suffixType) {
                case SuffixType.Dash:
                    beatCount += 1
                    break
                case SuffixType.Underline:
                    beatCount /= 2
                    break
                case SuffixType.DotAfter:
                    beatCount *= 2 - Math.pow(2, - (suffix as DotAfter).count)
                    break
                default:
                    break
            }
        })
        return beatCount
    }
}

export { Staff }
