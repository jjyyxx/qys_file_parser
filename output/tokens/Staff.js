"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_js_1 = require("./BaseToken.js");
const TokenDecorator_1 = require("./TokenDecorator");
const TokenType_1 = require("./TokenType");
let Staff = Staff_1 = class Staff extends BaseToken_js_1.BaseToken {
    constructor({ pitch = 0, isRest = false, isDuplicate = false, }) {
        super(TokenType_1.TokenType.Staff);
        this.oriPitchLiteral = pitch;
        this.oriPitch = Staff_1.pitchDict[this.oriPitchLiteral];
        this.oriBeatCount = 1;
        this.isRest = isRest;
        this.isDuplicate = isDuplicate;
        this.suffixes = [];
    }
    alterDup(pitch, beatCount) {
        this.oriPitch = pitch;
        this.oriBeatCount = beatCount;
        this.isDuplicate = false;
    }
    appendSuffix(suffix) {
        const lastSuffix = this.suffixes.last();
        if (lastSuffix && lastSuffix.suffixType === TokenType_1.SuffixType.DotAfter && suffix.suffixType === TokenType_1.SuffixType.DotAfter) {
            lastSuffix.increase();
        }
        else {
            this.suffixes.push(suffix);
        }
    }
    toString() {
        const suffixString = this.suffixes.map((value) => value.toString()).reduce((pre, cur) => pre + cur, '');
        if (this.isDuplicate) {
            return '%' + suffixString;
        }
        else {
            return this.oriPitchLiteral.toString() + suffixString;
        }
    }
    get pitch() {
        return this.calcPitch();
    }
    get beatCount() {
        return this.calcBeat();
    }
    calcPitch() {
        let pitch = this.oriPitch;
        this.suffixes.forEach((suffix) => {
            switch (suffix.suffixType) {
                case TokenType_1.SuffixType.DotAbove:
                    pitch += 12;
                    break;
                case TokenType_1.SuffixType.DotBelow:
                    pitch -= 12;
                    break;
                case TokenType_1.SuffixType.Flat:
                    pitch -= 1;
                    break;
                case TokenType_1.SuffixType.Sharp:
                    pitch += 1;
                    break;
                default:
                    break;
            }
        });
        return pitch;
    }
    calcBeat() {
        let beatCount = this.oriBeatCount;
        this.suffixes.forEach((suffix) => {
            switch (suffix.suffixType) {
                case TokenType_1.SuffixType.Dash:
                    beatCount += 1;
                    break;
                case TokenType_1.SuffixType.Underline:
                    beatCount /= 2;
                    break;
                case TokenType_1.SuffixType.DotAfter:
                    beatCount *= 2 - Math.pow(2, -suffix.count);
                    break;
                default:
                    break;
            }
        });
        return beatCount;
    }
};
Staff.pattern = /./;
Staff.pitchDict = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
Staff = Staff_1 = __decorate([
    TokenDecorator_1.Token
], Staff);
exports.Staff = Staff;
var Staff_1;
//# sourceMappingURL=Staff.js.map