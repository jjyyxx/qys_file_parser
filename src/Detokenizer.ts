import { BaseToken } from './tokens/BaseToken'

class Detokenizer {
    public readonly tokens: BaseToken[]

    constructor(tokens: BaseToken[]) {
        this.tokens = tokens
    }

    public detokenize(): string {
        return this.tokens.map((value) => value.toString()).reduce((pre, cur) => pre + cur)
    }
}

export { Detokenizer }
