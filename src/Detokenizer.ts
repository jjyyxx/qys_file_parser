import { TokenizedData } from './TokenizedData'
import { BaseToken } from './tokens/BaseToken'

class Detokenizer {
    public readonly tokenizedData: TokenizedData

    constructor(tokenizedData: TokenizedData) {
        this.tokenizedData = tokenizedData
    }

    public detokenize(): string {
        return this.tokenizedData.toString()
    }
}

export { Detokenizer }
