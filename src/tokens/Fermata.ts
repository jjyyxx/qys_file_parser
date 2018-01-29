import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Fermata extends BaseToken {
    public static pattern = /^\(\.\)/

    public Ratio: number
    constructor(startIndex: number) {
        super(TokenType.Fermata, startIndex)
        this.Ratio = 2
    }

    public toString(): string {
        return '(.)'
    }
}

export { Fermata }
