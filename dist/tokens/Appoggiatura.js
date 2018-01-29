var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Tokenizer } from '../Tokenizer';
import { BaseToken } from './BaseToken';
import { Token } from './TokenDecorator';
import { TokenType } from './TokenType';
let Appoggiatura = class Appoggiatura extends BaseToken {
    constructor(startIndex, matched) {
        super(TokenType.Appoggiatura, startIndex);
        this.Notes = Tokenizer.tokenize(matched[0].slice(1, -2));
    }
    toString() {
        return `(${this.Notes.map((note) => note.toString()).reduce((pre, cur) => pre + cur)}^)`;
    }
};
Appoggiatura.pattern = /^\([^)]+\^\)/;
Appoggiatura = __decorate([
    Token
], Appoggiatura);
export { Appoggiatura };
//# sourceMappingURL=Appoggiatura.js.map