import { BaseToken } from './BaseToken.js'
import { Token } from './TokenDecorator'
import { SuffixType, TokenType } from './TokenType'

@Token
class Suffix extends BaseToken {
    public static pattern = /./
    public static readonly SuffixDict: { [Key: string]: SuffixType } = {
        '\'': SuffixType.DotAbove,
        ',': SuffixType.DotBelow,
        'b': SuffixType.Flat,
        '#': SuffixType.Sharp,
        '-': SuffixType.Dash,
        '_': SuffixType.Underline,
        '.': SuffixType.DotAfter,
    }
    public static readonly Suffix = new Set(Object.keys(Suffix.SuffixDict))
    public readonly suffixType: SuffixType
    constructor(suffix: SuffixType) {
        super(TokenType.Suffix)
        this.suffixType = suffix
    }

    public toString(): string {
        return Object.getKeyByValue(Suffix.SuffixDict, this.suffixType)
    }
}

export { Suffix }
