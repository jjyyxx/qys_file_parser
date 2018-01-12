"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = require("../Tokenizer");
const BaseToken_js_1 = require("./BaseToken.js");
const TokenDecorator_1 = require("./TokenDecorator");
const TokenType_1 = require("./TokenType");
let Note = Note_1 = class Note extends BaseToken_js_1.BaseToken {
    constructor(matched) {
        super(TokenType_1.TokenType.Note);
        this.oriPitchLiteral = 0;
        this.oriBeatCount = 1;
        this.isRest = false;
        this.isDuplicate = false;
        const note = matched[0];
        const pitch = note.charAt(0);
        switch (pitch) {
            case '0':
                this.isRest = true;
                break;
            case '%':
                this.isDuplicate = true;
                break;
            default:
                this.oriPitchLiteral = Number(pitch);
                break;
        }
        this.oriPitch = Note_1.pitchDict[this.oriPitchLiteral];
        this.suffixes = Tokenizer_1.Tokenizer.tokenize(note.slice(1));
    }
    alterDup(pitch, beatCount) {
        this.oriPitch = pitch;
        this.oriBeatCount = beatCount;
        this.isDuplicate = false;
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
                    beatCount *= 2 - Math.pow(2, -suffix.dotCount);
                    break;
                default:
                    break;
            }
        });
        return beatCount;
    }
};
Note.pattern = /^[0-7%][',b#\-_.]*/;
Note.pitchDict = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
Note = Note_1 = __decorate([
    TokenDecorator_1.Token
], Note);
exports.Note = Note;
var Note_1;
//# sourceMappingURL=Note.js.map