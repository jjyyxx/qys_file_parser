import { BaseToken } from './BaseToken';
import { TokenType } from './TokenType';
class UnrecognizedToken extends BaseToken {
    constructor(token) {
        super(TokenType.Unrecognized);
        this.token = token;
    }
    toString() {
        return this.token;
    }
}
export { UnrecognizedToken };
//# sourceMappingURL=UnrecognizedToken.js.map