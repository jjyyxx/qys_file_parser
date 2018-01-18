var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseToken } from './BaseToken';
import { Token } from './TokenDecorator';
import { TokenType } from './TokenType';
let Tremolo2 = class Tremolo2 extends BaseToken {
    constructor(matched) {
        super(TokenType.Tremolo2);
        this.StrokesCount = Number(matched[0].slice(1, -2));
    }
    toString() {
        return `(${this.StrokesCount}=)`;
    }
};
Tremolo2.pattern = /^\(\d+=\)/;
Tremolo2 = __decorate([
    Token
], Tremolo2);
export { Tremolo2 };
//# sourceMappingURL=Tremolo2.js.map