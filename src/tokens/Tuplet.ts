import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Tuplet extends BaseToken {
    public static pattern = /./
    public readonly count: number

    constructor(count: number) {
        super(TokenType.Tuplet)
        this.count = count
    }

    public toString(): string {
        return `(${this.count})`
    }
}

export { Tuplet }
