"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class UnrecognizedToken extends BaseToken_1.BaseToken {
    constructor(token) {
        super(TokenType_1.TokenType.Unrecognized);
        this.token = token;
    }
}
exports.UnrecognizedToken = UnrecognizedToken;
//# sourceMappingURL=UnrecognizedToken.js.map