"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class Repeat extends BaseToken_1.BaseToken {
    constructor(leftOrRight) {
        super(TokenType_1.TokenType.Repeat);
        this.leftOrRight = leftOrRight;
    }
}
exports.Repeat = Repeat;
//# sourceMappingURL=Repeat.js.map