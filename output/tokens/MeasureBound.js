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
let MeasureBound = class MeasureBound extends BaseToken_1.BaseToken {
    constructor() {
        super(TokenType_1.TokenType.MeasureBound);
    }
    toString() {
        return '|';
    }
};
MeasureBound.pattern = /./;
MeasureBound = __decorate([
    TokenDecorator_1.Token
], MeasureBound);
exports.MeasureBound = MeasureBound;
//# sourceMappingURL=MeasureBound.js.map