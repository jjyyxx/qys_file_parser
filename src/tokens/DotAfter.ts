import { Suffix } from './Suffix'
import { Token } from './TokenDecorator'
import { SuffixType } from './TokenType'

@Token
class DotAfter extends Suffix {
    public static pattern = /./
    public count: number
    constructor() {
        super(SuffixType.DotAfter)
        this.count = 1
    }

    public increase() {
        this.count += 1
    }

    public toString(): string {
        return '.'.repeat(this.count)
    }
}

export { DotAfter }
