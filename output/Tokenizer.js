"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("./Global");
class Tokenizer {
    static tokenize(content) {
        const result = [];
        while (content.length > 0) {
            const matchedPattern = Global_1.Global.Patterns.find((patternObj) => patternObj.pattern.test(content));
            if (matchedPattern) {
                const matchedText = content.match(matchedPattern.pattern);
                try {
                    result.push(new matchedPattern.constuctor(matchedText));
                }
                catch (error) {
                    result.push(new Global_1.Global.FallbackToken(matchedText[0])); // FIXME: better way
                }
                content = content.slice(matchedText[0].length);
            }
            else {
                result.push(new Global_1.Global.FallbackToken(content.charAt(0))); // FIXME: better way
                content = content.slice(1);
            }
        }
        return result;
    }
    constructor(content) {
        this.content = content;
        this.result = [];
    }
    tokenize() {
        this.result = Tokenizer.tokenize(this.content);
        return this.result;
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map