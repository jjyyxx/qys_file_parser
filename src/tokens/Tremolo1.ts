import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Tremolo1 extends BaseToken {
    public static pattern = /^\(\d+\-\)/

    public StrokesCount: number
    constructor(startIndex: number, matched: RegExpMatchArray) {
        super(TokenType.Tremolo1, startIndex)
        this.StrokesCount = Number(matched[0].slice(1, -2))
    }

    public toString() {
        return `(${this.StrokesCount}-)`
    }
}

export { Tremolo1 }
