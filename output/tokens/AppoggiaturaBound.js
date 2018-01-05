"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class AppoggiaturaBound extends BaseToken_1.BaseToken {
    constructor(leftOrRight) {
        super(TokenType_1.TokenType.AppoggiaturaBound);
        this.leftOrRight = leftOrRight;
    }
    toString() {
        return this.leftOrRight === TokenType_1.PairType.Left ? '(' : '^)';
    }
}
exports.AppoggiaturaBound = AppoggiaturaBound;
//# sourceMappingURL=AppoggiaturaBound.js.map