import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class MeasureBound extends BaseToken {
    public static pattern = /./
    constructor() {
        super(TokenType.MeasureBound)
    }

    public toString(): string {
        return '|'
    }
}

export { MeasureBound }
