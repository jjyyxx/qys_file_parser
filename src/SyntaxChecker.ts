import { BaseToken } from './tokens/BaseToken'

class SyntaxChecker {
    public tokens: BaseToken[]

    constructor(tokens: BaseToken[]) {
        this.tokens = tokens
    }

    public check(): { correctness: boolean, errors: string[] } {
        return { correctness: true, errors: [] }    // TODO: to implement later
    }
}

export { SyntaxChecker }
