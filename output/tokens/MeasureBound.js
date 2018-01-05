"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class MeasureBound extends BaseToken_1.BaseToken {
    constructor() {
        super(TokenType_1.TokenType.MeasureBound);
    }
    toString() {
        return '|';
    }
}
exports.MeasureBound = MeasureBound;
//# sourceMappingURL=MeasureBound.js.map