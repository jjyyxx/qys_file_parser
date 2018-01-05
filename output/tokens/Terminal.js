"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class Terminal extends BaseToken_1.BaseToken {
    constructor() {
        super(TokenType_1.TokenType.Terminal);
    }
}
exports.Terminal = Terminal;
//# sourceMappingURL=Terminal.js.map