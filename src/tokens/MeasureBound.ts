import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { BoundType, TokenType } from './TokenType'

@Token
class MeasureBound extends BaseToken {
    public static pattern = /^(:\|\|:|\|\|:|:\|\||\|\||\||\\)/

    public readonly BoundType: BoundType
    public NewLine: boolean = false
    constructor(startIndex: number, matched: RegExpMatchArray) {
        super(TokenType.MeasureBound, startIndex)
        switch (matched[0]) {
            case '|':
                this.BoundType = BoundType.Normal
                break
            case ':||':
                this.BoundType = BoundType.RepeatRight
                break
            case '||:':
                this.BoundType = BoundType.RepeatLeft
                break
            case ':||:':
                this.BoundType = BoundType.RepeatBoth
                break
            case '||':
                this.BoundType = BoundType.Terminal
                break
            case '\\':
                this.BoundType = BoundType.Normal
                this.NewLine = true
        }
    }

    public toString(): string {
        switch (this.BoundType) {
            case BoundType.Normal:
                return this.NewLine ? '\\\n' : '|'
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
