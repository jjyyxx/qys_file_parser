"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class RepeatBound extends BaseToken_1.BaseToken {
    constructor(leftOrRight) {
        super(TokenType_1.TokenType.RepeatBound);
        this.leftOrRight = leftOrRight;
    }
    toString() {
        return this.leftOrRight === TokenType_1.PairType.Left ? '||:' : ':||';
    }
}
exports.RepeatBound = RepeatBound;
//# sourceMappingURL=RepeatBound.js.map