"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class Appoggiatura extends BaseToken_1.BaseToken {
    constructor(LeftOrRight) {
        super(TokenType_1.TokenType.Appoggiatura);
        this.LeftOrRight = LeftOrRight;
    }
}
exports.Appoggiatura = Appoggiatura;
//# sourceMappingURL=Appoggiatura.js.map