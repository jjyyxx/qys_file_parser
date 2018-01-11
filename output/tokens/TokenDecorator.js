"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("../global");
function Token(constructor) {
    global_1.RegisterPattern(constructor, constructor.pattern);
}
exports.Token = Token;
//# sourceMappingURL=TokenDecorator.js.map