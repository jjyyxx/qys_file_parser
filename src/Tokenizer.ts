import { Global } from './Global'
import { BaseToken } from './tokens/BaseToken'
import { UnrecognizedToken } from './tokens/UnrecognizedToken'

class Tokenizer {
    public static tokenize<T extends BaseToken>(content: string): T[] {
        const result: T[] = []
        while (content.length > 0) {
            const matchedPattern = Global.Patterns.find((patternObj) => patternObj.pattern.test(content))
            if (matchedPattern) {
                const matchedText = content.match(matchedPattern.pattern)
                try {
                    result.push(new matchedPattern.constuctor(matchedText) as T)
                } catch (error) {
                    result.push(new Global.FallbackToken(matchedText[0]) as any) // FIXME: better way
                }
                content = content.slice(matchedText[0].length)
            } else {
                result.push(new Global.FallbackToken(content.charAt(0)) as any)  // FIXME: better way
                content = content.slice(1)
            }
        }
        return result
    }

    private content: string
    private result: BaseToken[]

    constructor(content: string) {
        this.content = content
        this.result = []
    }

    public tokenize(): BaseToken[] {
        this.result = Tokenizer.tokenize(this.content)
        return this.result
    }
}

export { Tokenizer }
