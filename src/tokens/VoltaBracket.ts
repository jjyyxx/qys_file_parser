import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class VoltaBracket extends BaseToken {
    public static pattern = {
        qym: /^\[(\d+.)+\]/,
    }
    public readonly NumbersOfTimes: number[]

    constructor(startIndex: number, matched: RegExpMatchArray) {
        super(TokenType.RepeatSkip, startIndex)
        this.NumbersOfTimes = matched[0].slice(1, -2).split('.').map((x) => Number(x))
    }

    public toString(): string {
        return `[${this.NumbersOfTimes.map((value) => value.toString() + '.').reduce((pre, cur) => pre + cur)}]`
    }
}

export { VoltaBracket }
