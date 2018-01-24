import { BaseToken } from './BaseToken.js'
import { Token } from './TokenDecorator'
import { SuffixType, TokenType } from './TokenType'

@Token
class Suffix extends BaseToken {
    public static pattern = /^('|,|b|#|\-|_|\.+)/
    public static readonly SuffixDict: { [Key: string]: SuffixType } = {
        '\'': SuffixType.DotAbove,
        ',': SuffixType.DotBelow,
        'b': SuffixType.Flat,
        '#': SuffixType.Sharp,
        '-': SuffixType.Dash,
        '_': SuffixType.Underline,
        '`': SuffixType.Staccato,
        '.': SuffixType.DotAfter,
    }
    public readonly suffixType: SuffixType
    public readonly dotCount: number
    constructor(matched: RegExpMatchArray) {
        super(TokenType.Suffix)
        const suffix = matched[0]
        if (suffix.charAt(0) === '.') {
            this.dotCount = suffix.length
            this.suffixType = SuffixType.DotAfter
        } else {
            this.dotCount = 0
            this.suffixType = Suffix.SuffixDict[suffix]
        }
    }

    public toString(): string {
        return Object.getKeyByValue(Suffix.SuffixDict, this.suffixType)
    }
}

export { Suffix }
