import { Global } from '../Global'
import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class FunctionToken extends BaseToken {
    public static pattern = /^<[^:>]+:[^:>]+>/

    public static parse(content: string) {
        const possibleKVPair = content.split(':').map((item) => item.trim())
        if (Global.isLegalSetting(possibleKVPair[0])) {
            return { key: possibleKVPair[0], value: possibleKVPair[1].toNumIfPossible() }
        }
    }

    public Name: string
    public Argument: string | number

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Function)
        const { key, value } = FunctionToken.parse(matched[0].slice(1, -1))
        this.Name = key
        this.Argument = value
    }
}

export { FunctionToken }
