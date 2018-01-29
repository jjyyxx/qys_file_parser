var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global } from '../Global';
import { BaseToken } from './BaseToken';
import { Token } from './TokenDecorator';
import { TokenType } from './TokenType';
let Tuplet = class Tuplet extends BaseToken {
    constructor(startIndex, matched) {
        super(TokenType.Tuplet, startIndex);
        switch (Global.CurrentFormat) {
            case 'qym':
                this.count = Number(matched[0].slice(1, -1));
                break;
            case 'qys':
                this.count = Number(matched[0].slice(1, -2));
                break;
        }
    }
    toString() {
        switch (Global.CurrentFormat) {
            case 'qym':
                return `(${this.count})`;
            case 'qys':
                return `(${this.count}~)`;
        }
    }
};
Tuplet.pattern = {
    qym: /^\(\d+\)/,
    qys: /^\(\d+~\)/,
};
Tuplet = __decorate([
    Token
], Tuplet);
export { Tuplet };
//# sourceMappingURL=Tuplet.js.map