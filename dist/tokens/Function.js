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
let FunctionToken = FunctionToken_1 = class FunctionToken extends BaseToken {
    constructor(matched) {
        super(TokenType.Function);
        const { key, value } = FunctionToken_1.parse(matched[0].slice(1, -1));
        this.Name = key;
        this.Argument = value;
    }
    static parse(content) {
        const possibleKVPair = content.split(':').map((item) => item.trim());
        if (Global.isLegalSetting(possibleKVPair[0])) {
            return { key: possibleKVPair[0], value: possibleKVPair[1].toNumIfPossible() };
        }
    }
    toString() {
        return `<${this.Name}:${this.Argument}>`;
    }
};
FunctionToken.pattern = /^<[^:>]+:[^:>]+>/;
FunctionToken = FunctionToken_1 = __decorate([
    Token
], FunctionToken);
export { FunctionToken };
var FunctionToken_1;
//# sourceMappingURL=Function.js.map