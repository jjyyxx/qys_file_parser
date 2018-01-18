var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseToken } from './BaseToken';
import { Token } from './TokenDecorator';
import { BoundType, TokenType } from './TokenType';
let MeasureBound = class MeasureBound extends BaseToken {
    constructor(matched) {
        super(TokenType.MeasureBound);
        this.NewLine = false;
        switch (matched[0]) {
            case '|':
                this.BoundType = BoundType.Normal;
                break;
            case ':||':
                this.BoundType = BoundType.RepeatRight;
                break;
            case '||:':
                this.BoundType = BoundType.RepeatLeft;
                break;
            case ':||:':
                this.BoundType = BoundType.RepeatBoth;
                break;
            case '||':
                this.BoundType = BoundType.Terminal;
                break;
            case '\\\\':
                this.BoundType = BoundType.Normal;
                this.NewLine = true;
        }
    }
    toString() {
        switch (this.BoundType) {
            case BoundType.Normal:
                return this.NewLine ? '\\\n' : '|';
            case BoundType.RepeatRight:
                return ':||';
            case BoundType.RepeatLeft:
                return '||:';
            case BoundType.RepeatBoth:
                return ':||:';
            case BoundType.Terminal:
                return '||';
        }
    }
};
MeasureBound.pattern = /^(:\|\|:|\|\|:|:\|\||\|\||\||\\\\)/;
MeasureBound = __decorate([
    Token
], MeasureBound);
export { MeasureBound };
//# sourceMappingURL=MeasureBound.js.map