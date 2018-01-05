"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_js_1 = require("./BaseToken.js");
const TokenType_1 = require("./TokenType");
class Suffix extends BaseToken_js_1.BaseToken {
    constructor(suffix) {
        super(TokenType_1.TokenType.Suffix);
        this.suffixType = suffix;
    }
}
exports.Suffix = Suffix;
//# sourceMappingURL=Suffix.js.map