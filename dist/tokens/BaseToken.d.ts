import { IToken } from '../LineTokenizer';
import { TokenType } from './TokenType';
declare abstract class BaseToken implements IToken {
    static typeToScopes: Map<TokenType, string>;
    private static initMap();
    startIndex: number;
    readonly type: TokenType;
    constructor(type: TokenType, startIndex: number);
    readonly scopes: string;
}
export { BaseToken };
