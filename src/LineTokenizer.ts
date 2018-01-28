import { Global } from './Global'
import { BaseToken } from './index'
import { Tokenizer } from './Tokenizer'

export interface TokensProvider {
    getInitialState(): IState
    tokenize(line: string, state: IState): ILineTokens
}

export interface IState {
    clone(): IState
    equals(other: IState): boolean
}

export interface ILineTokens {
    tokens: IToken[]
    endState: IState
}

export interface IToken {
    startIndex: number
    scopes: string
}

class LineTokenizer implements TokensProvider {
    public static tokenize<T extends BaseToken>(
        content: string,
        patterns: Array<{ constuctor: { new(...args: any[]): any }, pattern: RegExp }> = Global.TokenPatterns,
    ): T[] {
        const result: T[] = []
        const oriLength = content.length
        while (content.length > 0) {
            const startIndex = oriLength - content.length
            const matchedPattern = patterns.find((patternObj) => patternObj.pattern.test(content))
            if (matchedPattern) {
                const matchedText = content.match(matchedPattern.pattern)
                try {
                    result.push(new matchedPattern.constuctor(startIndex, matchedText) as T)
                } catch (error) {
                    result.push(new Global.FallbackToken(startIndex, matchedText[0]) as any)
                }
                content = content.slice(matchedText[0].length)
            } else {
                result.push(new Global.FallbackToken(startIndex, content.charAt(0)) as any)
                content = content.slice(1)
            }
        }
        return result
    }

    public tokenize(line: string, state: IState): ILineTokens {
        return {
            tokens: Tokenizer.tokenize(line),
            endState: undefined,
        }
    }

    /*public tokenize(): TokenizedData {
        const pre = new Preprocessor(this.content)
        const {comments, content} = pre.preprocess()
        this.tokenizedData.Comments = comments
        this.content = content
        this.tokenizedData.Sections = Tokenizer.tokenize(this.content, Global.StructurePatterns)
        return this.tokenizedData
    }*/

    public getInitialState(): IState {
        return undefined
    }
}

export { LineTokenizer }
