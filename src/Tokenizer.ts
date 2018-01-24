import { Global } from './Global'
import { Preprocessor } from './Preprocessor'
import { TokenizedData } from './TokenizedData'
import { BaseStructure, BaseToken } from './tokens/BaseToken'
import { UnrecognizedToken } from './tokens/UnrecognizedToken'

class Tokenizer {
    public static tokenize<T extends BaseToken | BaseStructure>(
        content: string,
        patterns: Array<{ constuctor: { new(...args: any[]): any }, pattern: RegExp }> = Global.TokenPatterns,
    ): T[] {
        const result: T[] = []
        while (content.length > 0) {
            const matchedPattern = patterns.find((patternObj) => patternObj.pattern.test(content))
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
    private tokenizedData: TokenizedData

    constructor(content: string) {
        this.content = content
        this.tokenizedData = new TokenizedData()
    }

    public tokenize(): TokenizedData {
        const pre = new Preprocessor(this.content)
        const {comments, content} = pre.preprocess()
        this.tokenizedData.Comments = comments
        this.content = content
        this.tokenizedData.Sections = Tokenizer.tokenize(this.content, Global.StructurePatterns)
        return this.tokenizedData
    }
}

export { Tokenizer }
