import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class RepeatSkip extends BaseToken {
    public static pattern = /^\[(\d+.)+\]/
    public readonly parts: number[]

    constructor(matched: RegExpMatchArray) {
        super(TokenType.RepeatSkip)
        this.parts = matched[0].slice(1, -2).split('.').map((x) => Number(x))
    }

    public toString(): string {
        return `[${this.parts.map((value) => value.toString() + '.').reduce((pre, cur) => pre + cur)}]`
    }
}

export { RepeatSkip }
