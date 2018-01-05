"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Detokenizer {
    constructor(tokens) {
        this.tokens = tokens;
    }
    detokenize() {
        return this.tokens.map((value) => value.toString()).reduce((pre, cur) => pre + cur);
    }
}
exports.Detokenizer = Detokenizer;
//# sourceMappingURL=Detokenizer.js.map