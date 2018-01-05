import { Suffix } from './Suffix'
import { SuffixType } from './TokenType'

class DotAfter extends Suffix {
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
