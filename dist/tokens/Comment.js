var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseToken } from './BaseToken';
import { Token } from './TokenDecorator';
import { TokenType } from './TokenType';
let Comment = class Comment extends BaseToken {
    constructor(matched) {
        super(TokenType.Comment);
        this.comment = matched[0].slice(2, -1);
    }
    toString() {
        return `//${this.comment}\n`;
    }
};
Comment.pattern = /^\/\/.*\n/;
Comment = __decorate([
    Token
], Comment);
export { Comment };
//# sourceMappingURL=Comment.js.map