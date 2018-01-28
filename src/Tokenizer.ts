import { Global } from './Global'
import { ILineTokens, IState, LineTokenizer } from './LineTokenizer'
import { Preprocessor } from './Preprocessor'
import { TokenizedData } from './TokenizedData'
import { BaseToken } from './tokens/BaseToken'
import { Comment } from './tokens/Comment'
import { FunctionToken } from './tokens/Function'
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
    private state: IState

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
            this.state = tokens.endState
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

    }
}

export { Tokenizer }
