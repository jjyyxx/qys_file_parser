import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class MeasureBound extends BaseToken {
    constructor() {
        super(TokenType.MeasureBound)
    }

    public toString(): string {
        return '|'
    }
}

export { MeasureBound }
