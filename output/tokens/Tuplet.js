"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class Tuplet extends BaseToken_1.BaseToken {
    constructor(count) {
        super(TokenType_1.TokenType.Tuplet);
        this.count = count;
    }
    toString() {
        return `(${this.count})`;
    }
}
exports.Tuplet = Tuplet;
//# sourceMappingURL=Tuplet.js.map