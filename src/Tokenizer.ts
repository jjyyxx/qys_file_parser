import { Global } from './Global'
import { ILineTokens, IState, LineTokenizer } from './LineTokenizer'
import { State } from './State'
import { TokenizedData } from './TokenizedData'
import { BaseToken } from './tokens/BaseToken'
import { Comment } from './tokens/Comment'
import { FunctionToken } from './tokens/Function'
import { MeasureBound } from './tokens/MeasureBound'
import { Section } from './tokens/Section'
import { UnrecognizedToken } from './tokens/UnrecognizedToken'

class Tokenizer {
    public static tokenize<T extends BaseToken>(
        content: string,
        patterns: Array<{ constuctor: { new(...args: any[]): any }, pattern: RegExp }> = Global.TokenPatterns,
    ): T[] {
        return LineTokenizer.tokenize(content, patterns)
    }

    public static isCommentLine(tokenizedLine: ILineTokens) {
        return (tokenizedLine.tokens.length === 1) && (tokenizedLine.tokens[0] instanceof Comment)
    }

    public static isInitLine(tokenizedLine: ILineTokens) {
        return tokenizedLine.tokens.every((token) => token instanceof FunctionToken)
    }

    private content: string
    private lines: string[]
    private tokenizedLines: ILineTokens[] = []
    private tokenizedData: TokenizedData
    private lineTok: LineTokenizer
    private state: State

    constructor(content: string) {
        this.content = content
        this.tokenizedData = new TokenizedData()
        this.lineTok = new LineTokenizer()
        this.lines = this.content.split('\n')
        this.state = this.lineTok.getInitialState()
    }

    public tokenize(): TokenizedData {
        this.tokenizeLines()
        if (Global.CurrentFormat === 'qym') {
            this.processQym()
        } else {
            this.processQys()
        }
        return this.tokenizedData
        /*const pre = new Preprocessor(this.content)
        const {comments, content} = pre.preprocess()
        this.tokenizedData.Comments = comments
        this.content = content
        this.tokenizedData.Sections = Tokenizer.tokenize(this.content, Global.StructurePatterns)*/
    }

    public tokenizeLines() {
        this.lines.forEach((line) => {
            const tokens = this.lineTok.tokenize(line, this.state/*.clone()*/)
            this.tokenizedLines.push(tokens)
            this.state = tokens.endState as State
        })
    }

    public processQym() {
        const splitted = this.tokenizedLines.split((line) => line.tokens.length === 0)
        if (splitted[0].every((line) => Tokenizer.isCommentLine(line))) {
            this.tokenizedData.Comments = [].concat(...splitted[0].map((line) => line.tokens[0]))
            this.tokenizedData.Sections = splitted.slice(1).map((lines) => new Section(lines))
        } else {
            this.tokenizedData.Sections = splitted.map((lines) => new Section(lines))
        }
    }

    public processQys() {
        const concatedLines = this.concatLines()
        const index = concatedLines.findIndex((line) => line.tokens.length === 0)
        if (index !== -1) {
            const possibleComments = concatedLines.slice(0, index)
            if (possibleComments.every((line) => Tokenizer.isCommentLine(line))) {
                this.tokenizedData.Comments = [].concat(...possibleComments.map((line) => line.tokens[0]))
                concatedLines.splice(0, index)
            }
        }
        let secParam: ILineTokens[] = []
        let secFlag = false
        while (concatedLines.length > 0) {
            const line = concatedLines.shift()
            if (line.tokens.length === 0) {
                continue
            }
            if (!Tokenizer.isCommentLine(line) && !Tokenizer.isInitLine(line)) {
                secFlag = true
            } else if (secFlag) {
                this.tokenizedData.Sections.push(new Section(secParam))
                secParam = []
                secFlag = false
            }
            secParam.push(line)
        }
        if (secParam.length > 0) {
            this.tokenizedData.Sections.push(new Section(secParam))
        }
    }

    private concatLines() {
        const result: ILineTokens[] = []
        let wrap = false
        this.tokenizedLines.forEach((line) => {
            const state = line.endState as State
            if (state.wrap) {
                if (line.tokens.slice(0, -1).every((token) => token instanceof FunctionToken)) {
                    line.tokens.splice(-1)
                } else {
                    const last2 = line.tokens.last(2)
                    if (last2 instanceof MeasureBound) {
                        last2.NewLine = true
                        line.tokens.splice(-1)
                    }
                }
            }
            if (wrap) {
                const last = result.last()
                last.tokens.push(...line.tokens)
                last.endState = line.endState
            } else {
                result.push(line)
            }
            wrap = state.wrap
        })
        return result
    }
}

export { Tokenizer }
