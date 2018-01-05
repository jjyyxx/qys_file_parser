"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_js_1 = require("./BaseToken.js");
const TokenType_1 = require("./TokenType");
class Staff extends BaseToken_js_1.BaseToken {
    constructor({ pitch = 0, isRest = false, isDuplicate = false, }) {
        super(TokenType_1.TokenType.Staff);
        this.oriPitch = pitch;
        this.isRest = isRest;
        this.isDuplicate = isDuplicate;
        this.suffixes = [];
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
    get pitch() {
        return this.calcPitch();
    }
    get beatCount() {
        return this.calcBeat();
    }
    calcPitch() {
        let pitch = Staff.pitchDict[this.oriPitch];
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
                case TokenType_1.SuffixType.DotAbove:
                    pitch += 1;
                    break;
                default:
                    break;
            }
        });
        return pitch;
    }
    calcBeat() {
        let beatCount = 1;
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
}
Staff.pitchDict = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
exports.Staff = Staff;
//# sourceMappingURL=Staff.js.map