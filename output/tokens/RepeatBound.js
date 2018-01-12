"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_1 = require("./BaseToken");
const TokenDecorator_1 = require("./TokenDecorator");
const TokenType_1 = require("./TokenType");
let RepeatBound = class RepeatBound extends BaseToken_1.BaseToken {
    constructor(matched) {
        super(TokenType_1.TokenType.RepeatBound);
        switch (matched[0]) {
            case '||:':
                this.leftOrRight = TokenType_1.PairType.Left;
                break;
            case ':||':
                this.leftOrRight = TokenType_1.PairType.Right;
                break;
        }
    }
    toString() {
        return this.leftOrRight === TokenType_1.PairType.Left ? '||:' : ':||';
    }
};
RepeatBound.pattern = /^(\|\|:|:\|\|)/;
RepeatBound = __decorate([
    TokenDecorator_1.Token
], RepeatBound);
exports.RepeatBound = RepeatBound;
//# sourceMappingURL=RepeatBound.js.map