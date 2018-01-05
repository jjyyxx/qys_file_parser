import { TokenType } from './TokenType'

abstract class BaseToken {
    public readonly type: TokenType
    constructor(type: TokenType) {
        this.type = type
    }
}

export { BaseToken }
