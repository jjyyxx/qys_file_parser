"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class RepeatSkip extends BaseToken_1.BaseToken {
    constructor(parts) {
        super(TokenType_1.TokenType.RepeatSkip);
        this.parts = parts;
    }
}
exports.RepeatSkip = RepeatSkip;
//# sourceMappingURL=RepeatSkip.js.map