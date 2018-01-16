import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { BoundType, TokenType } from './TokenType'

@Token
class MeasureBound extends BaseToken {
    public static pattern = /^(:\|\|:|\|\|:|:\|\||\|\||\|)/

    public readonly boundType: BoundType
    constructor(matched: RegExpMatchArray) {
        super(TokenType.MeasureBound)
        switch (matched[0]) {
            case '|':
                this.boundType = BoundType.Normal
                break
            case ':||':
                this.boundType = BoundType.RepeatRight
                break
            case '||:':
                this.boundType = BoundType.RepeatLeft
                break
            case ':||:':
                this.boundType = BoundType.RepeatBoth
                break
            case '||':
                this.boundType = BoundType.Terminal
                break
        }
    }

    public toString(): string {
        switch (this.boundType) {
            case BoundType.Normal:
                return '|'
            case BoundType.RepeatRight:
                return ':||'
            case BoundType.RepeatLeft:
                return '||:'
            case BoundType.RepeatBoth:
                return ':||:'
            case BoundType.Terminal:
                return '||'
        }
    }
}

export { MeasureBound }
