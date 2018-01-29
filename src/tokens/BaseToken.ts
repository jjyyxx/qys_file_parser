import { IToken } from '../LineTokenizer'
import { StructureType, TokenType } from './TokenType'

abstract class BaseToken implements IToken {
    public static typeToScopes: Map<TokenType, string> = BaseToken.initMap()

    private static initMap() {
        const newMap: Map<TokenType, string> = new Map()
        newMap.set(TokenType.Appoggiatura, '')
        newMap.set(TokenType.Comment, '')
        newMap.set(TokenType.Fermata, '')
        newMap.set(TokenType.Function, '')
        newMap.set(TokenType.MeasureBound, '')
        newMap.set(TokenType.Note, '')
        newMap.set(TokenType.Portamento, '')
        newMap.set(TokenType.RepeatSkip, '')
        newMap.set(TokenType.Tie, '')
        newMap.set(TokenType.Tremolo1, '')
        newMap.set(TokenType.Tremolo2, '')
        newMap.set(TokenType.Tuplet, '')
        return newMap
    }

    public startIndex: number
    public readonly type: TokenType
    constructor(type: TokenType, startIndex: number) {
        this.type = type
        this.startIndex = startIndex
    }

    get scopes() {
        return BaseToken.typeToScopes.get(this.type)
    }
}

export { BaseToken }
