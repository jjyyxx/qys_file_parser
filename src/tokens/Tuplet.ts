import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Tuplet extends BaseToken {
    public static pattern = /^\(\d+\)/
    public readonly count: number

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Tuplet)
        this.count = Number(matched[0].slice(1, -1))
    }

    public toString(): string {
        return `(${this.count})`
    }
}

export { Tuplet }
