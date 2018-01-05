import { Dispatcher } from './Dispatcher'
import { qysParserContext } from './qysParserContext'

export { qysFileParser }

// tslint:disable-next-line:class-name
class qysFileParser {
    // TODO: improve pattern
    public readonly legalSymbols: Set<string> = new Set([
        'b', '#', ',', '\'', '%', '|', '.', '-', '_', '^', '[', '(', '<', '/', ' ', '\n',
    ])
    public readonly regionalSymbol: Set<string> = new Set(['[', '(', '<'])

    private context: qysParserContext
    private dispatcher: Dispatcher

    constructor(content: string) {
        this.context = new qysParserContext(content)
        this.dispatcher = new Dispatcher(this.context)
    }

    public parse(): qysParserContext {
        while (!this.context.isEnded()) {
            const nextChar = this.context.nextChar()
            /*             if (this.regionalSymbol.has(nextChar)) {
                            throw "regional symbol is not supported yet"
                        } */
            this.dispatch(nextChar)
        }
        this.context.finalCommit()
        return this.context
    }

    private dispatch(char: string/* , context : qysParserContext */) {
        if (char.length !== 1) {
            throw new Error('length incompatible')
        } else if (char.isNumeric()) {
            const pitch = Number(char)
            this.dispatcher.pitch(pitch)
        } else if (this.legalSymbols.has(char)) {
            this.dispatcher[char]()
        } else {
            throw new Error(`illegal symbol ${char} is given`)
        }
    }
}
