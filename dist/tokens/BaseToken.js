import { TokenType } from './TokenType';
class BaseToken {
    constructor(type, startIndex) {
        this.type = type;
        this.startIndex = startIndex;
    }
    static initMap() {
        const newMap = new Map();
        newMap.set(TokenType.Appoggiatura, '');
        newMap.set(TokenType.Comment, '');
        newMap.set(TokenType.Fermata, '');
        newMap.set(TokenType.Function, '');
        newMap.set(TokenType.MeasureBound, '');
        newMap.set(TokenType.Note, '');
        newMap.set(TokenType.Portamento, '');
        newMap.set(TokenType.RepeatSkip, '');
        newMap.set(TokenType.Tie, '');
        newMap.set(TokenType.Tremolo1, '');
        newMap.set(TokenType.Tremolo2, '');
        newMap.set(TokenType.Tuplet, '');
        return newMap;
    }
    get scopes() {
        return BaseToken.typeToScopes.get(this.type);
    }
}
BaseToken.typeToScopes = BaseToken.initMap();
export { BaseToken };
//# sourceMappingURL=BaseToken.js.map