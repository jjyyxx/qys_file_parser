import { Global } from '../Global'
import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Tuplet extends BaseToken {
    public static pattern = {
        qym: /^\(\d+\)/,
        qys: /^\(\d+~\)/,
    }
    public readonly count: number

    constructor(startIndex: number, matched: RegExpMatchArray) {
        super(TokenType.Tuplet, startIndex)
        switch (Global.CurrentFormat) {
            case 'qym':
                this.count = Number(matched[0].slice(1, -1))
                break
            case 'qys':
                this.count = Number(matched[0].slice(1, -2))
                break
        }
    }

    public toString(): string {     // TODO: consider refactoring
        switch (Global.CurrentFormat) {
            case 'qym':
                return `(${this.count})`
            case 'qys':
                return `(${this.count}~)`
        }
    }
}

export { Tuplet }
