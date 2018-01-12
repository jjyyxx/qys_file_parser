"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Suffix_1 = require("./Suffix");
const TokenDecorator_1 = require("./TokenDecorator");
const TokenType_1 = require("./TokenType");
let DotAfter = class DotAfter extends Suffix_1.Suffix {
    constructor() {
        super(TokenType_1.SuffixType.DotAfter);
        this.count = 1;
    }
    increase() {
        this.count += 1;
    }
    toString() {
        return '.'.repeat(this.count);
    }
};
DotAfter.pattern = /^\.*/;
DotAfter = __decorate([
    TokenDecorator_1.Token
], DotAfter);
exports.DotAfter = DotAfter;
//# sourceMappingURL=DotAfter.js.map