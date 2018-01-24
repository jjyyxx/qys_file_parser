import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Fermata extends BaseToken {
    public static pattern = /^\(\.\)/

    public Ratio: number
    constructor() {
        super(TokenType.Fermata)
        this.Ratio = 2
    }

    public toString(): string {
        return '(.)'
    }
}

export { Fermata }
