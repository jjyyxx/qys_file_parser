"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("../Global");
function Token(constructor) {
    Global_1.Global.RegisterPattern(constructor, constructor.pattern);
}
exports.Token = Token;
//# sourceMappingURL=TokenDecorator.js.map