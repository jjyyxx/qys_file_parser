import { BaseToken } from './BaseToken.js'
import { SuffixType, TokenType } from './TokenType'

class Suffix extends BaseToken {
    public readonly suffixType: SuffixType
    constructor(suffix: SuffixType) {
        super(TokenType.Suffix)
        this.suffixType = suffix
    }
}

export { Suffix }
