import { BaseToken } from './BaseToken';
import { TokenType } from './TokenType';
class UnrecognizedToken extends BaseToken {
    constructor(startIndex, token) {
        super(TokenType.Unrecognized, startIndex);
        this.token = token;
    }
    toString() {
        return this.token;
    }
}
export { UnrecognizedToken };
//# sourceMappingURL=UnrecognizedToken.js.map