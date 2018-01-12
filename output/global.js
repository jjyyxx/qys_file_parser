"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnrecognizedToken_1 = require("./tokens/UnrecognizedToken");
class Global {
    static RegisterPattern(constuctor, pattern) {
        Global.Patterns.push({
            constuctor,
            pattern,
        });
    }
}
Global.Patterns = [];
Global.FallbackToken = UnrecognizedToken_1.UnrecognizedToken;
exports.Global = Global;
//# sourceMappingURL=Global.js.map