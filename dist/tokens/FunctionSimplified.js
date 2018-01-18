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
let FunctionSimplified = FunctionSimplified_1 = class FunctionSimplified extends BaseToken {
    constructor(matched) {
        super(TokenType.FunctionSimplified);
        const KVArray = FunctionSimplified_1.parse(matched[0]);
        if (KVArray.length === 1) {
            this.Name = KVArray[0].key;
            this.Argument = KVArray[0].value;
        }
        else {
            this.Name = KVArray.map((KVPair) => KVPair.key).reduce((pre, cur) => `${pre}&${cur}`);
            this.Argument = Object.reverseFrom(KVArray);
        }
    }
    static parse(func) {
        const finalSetting = [];
        const content = func.slice(1, -1);
        if (content.isNumeric()) {
            if (content.includes('.')) {
                return [{ key: 'Volume', value: Number(content) }];
            }
            return [{ key: 'Speed', value: Number(content) }];
        }
        if (content.endsWith('%') && content.slice(0, -1).isNumeric()) {
            return [{ key: 'Volume', value: Number(content.slice(0, -1)) / 100 }];
        }
        const possibleBeatTuple = content.toFraction();
        if (possibleBeatTuple) {
            return [
                { key: 'Bar', value: possibleBeatTuple.Numerator },
                { key: 'Beat', value: possibleBeatTuple.Denominator },
            ];
        }
        if (content.startsWith('1=')) {
            const result = FunctionSimplified_1.parseTonality(content.slice(2));
            if (result) {
                return result;
            }
            else {
                throw new Error('illegal setting');
            }
        }
        if ((func.startsWith('{') && func.endsWith('}'))
            || ((func.startsWith('<') && func.endsWith('>')))) {
            return [
                { key: 'Instr', value: content },
            ];
        }
        throw new Error('illegal setting');
    }
    static parseTonality(possibleKey) {
        if (possibleKey.endsWith('\'')) {
            const result = FunctionSimplified_1.calcOctave(possibleKey, '\'');
            if (result) {
                return [
                    { key: 'Key', value: result.key },
                    { key: 'Oct', value: result.octave },
                ];
            }
            else {
                return undefined;
            }
        }
        else if (possibleKey.endsWith(',')) {
            const result = FunctionSimplified_1.calcOctave(possibleKey, ',');
            if (result) {
                return [
                    { key: 'Key', value: result.key },
                    { key: 'Oct', value: -result.octave },
                ];
            }
            else {
                return undefined;
            }
        }
        else if (Global.isLegalTonality(possibleKey)) {
            return [{
                    key: 'Key',
                    value: Global.tonalityDict[possibleKey],
                }];
        }
        else {
            return undefined;
        }
    }
    static calcOctave(content, char) {
        const firstOccurance = content.indexOf(char);
        const remain = content.slice(0, firstOccurance);
        if (Global.isLegalTonality(remain)) {
            return {
                key: Global.tonalityDict[remain],
                octave: content.length - firstOccurance,
            };
        }
        else {
            return undefined;
        }
    }
    toString() {
        switch (this.Name) {
            case 'Volume':
                switch (Global.CurrentFormat) {
                    case 'qym':
                        return '<' + (this.Argument * 100).toString() + '%>';
                    case 'qys':
                        return `<${Number.isInteger(this.Argument)
                            ? this.Argument.toString() + '.0'
                            : this.Argument.toString()}>`;
                }
            case 'Instr':
                switch (Global.CurrentFormat) {
                    case 'qym':
                        return `{${this.Argument}}`;
                    case 'qys':
                        return `<${this.Argument}>`;
                }
            case 'Speed':
                return `<${this.Argument.toString()}>`;
            case 'Bar&Beat':
                return `<${this.Argument.Bar.toString() + '/' + this.Argument.Beat.toString()}>`;
            case 'Key':
                return `<1=${Object.getKeyByValue(Global.tonalityDict, this.Argument)}>`;
            case 'Key&Oct':
                const octave = this.Argument.Oct;
                const suffix = octave > 0 ? '\''.repeat(octave) : ','.repeat(-octave);
                return `<1=${Object.getKeyByValue(Global.tonalityDict, this.Argument.Key)}${suffix}>`;
        }
    }
};
FunctionSimplified.pattern = /^(<[^:>]+>|{[^}]+})/; // TODO: consider a more strict one
FunctionSimplified = FunctionSimplified_1 = __decorate([
    Token
], FunctionSimplified);
export { FunctionSimplified };
var FunctionSimplified_1;
//# sourceMappingURL=FunctionSimplified.js.map