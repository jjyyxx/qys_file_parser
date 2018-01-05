"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class Comment extends BaseToken_1.BaseToken {
    constructor(comment) {
        super(TokenType_1.TokenType.Comment);
        this.comment = comment;
    }
    toString() {
        return `//${this.comment}\n`;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map