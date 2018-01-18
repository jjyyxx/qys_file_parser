var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseToken } from './BaseToken';
import { Token } from './TokenDecorator';
import { TokenType } from './TokenType';
let Portamento = class Portamento extends BaseToken {
    constructor() {
        super(TokenType.Portamento);
    }
    toString() {
        return '~';
    }
};
Portamento.pattern = /^~/;
Portamento = __decorate([
    Token
], Portamento);
export { Portamento };
//# sourceMappingURL=Portamento.js.map