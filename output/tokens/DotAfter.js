"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Suffix_1 = require("./Suffix");
const TokenType_1 = require("./TokenType");
class DotAfter extends Suffix_1.Suffix {
    constructor() {
        super(TokenType_1.SuffixType.DotAfter);
        this.count = 1;
    }
    increase() {
        this.count += 1;
    }
}
exports.DotAfter = DotAfter;
//# sourceMappingURL=DotAfter.js.map