var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global } from '../Global';
import { Tokenizer } from '../Tokenizer';
import { BaseToken } from './BaseToken.js';
import { Pitch } from './Pitch';
import { Token } from './TokenDecorator';
import { SuffixType, TokenType } from './TokenType';
let Note = class Note extends BaseToken {
    constructor(matched) {
        super(TokenType.Note);
        this.Arpeggio = false;
        let note = matched[0];
        if (Global.CurrentFormat === 'qym') {
            const pitchPart = note.match(/^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*/)[0];
            this.parseQymPitch(pitchPart);
            this.Suffix = Tokenizer.tokenize(note.slice(pitchPart.length));
        }
        else {
            if (note.includes('^')) {
                this.Arpeggio = true;
                note = note.replace('^', '');
            }
            if (note.startsWith('[')) {
                const pitchPart = note.match(/^\[([0-7%xX][',b#]*)*\]/)[0].slice(1, -1);
                this.parseQysPitch(pitchPart);
                this.Suffix = Tokenizer.tokenize(note.slice(pitchPart.length + 2));
            }
            else {
                const pitchPart = note.charAt(0);
                this.Pitches = [new Pitch(note.charAt(0))];
                this.Suffix = Tokenizer.tokenize(note.slice(1));
            }
        }
    }
    parseQymPitch(pitchPart) {
        const pitches = pitchPart.split('&');
        this.Pitches = pitches.map((pitch) => new Pitch(pitch));
    }
    parseQysPitch(pitchPart) {
        const pitches = [];
        while (pitchPart.length > 0) {
            const matched = pitchPart.match(Pitch.pattern.qys);
            pitches.push(new Pitch(matched[0]));
            pitchPart = pitchPart.slice(matched[0].length);
        }
        this.Pitches = pitches;
    }
    toString() {
        switch (Global.CurrentFormat) {
            case 'qym':
                const index = this.Suffix.findIndex((suffix) => suffix.suffixType !== SuffixType.Flat && suffix.suffixType !== SuffixType.Sharp);
                const prefixString = this.Suffix.slice(0, index)
                    .map((value) => value.toString()).reduce((pre, cur) => pre + cur, '');
                const suffixString = this.Suffix.slice(index)
                    .map((value) => value.toString()).reduce((pre, cur) => pre + cur, '');
                const pitchString = this.Pitches.map((pitch) => pitch.toString()).reduce((pre, cur) => `${pre}&${cur}`);
                return prefixString + pitchString + suffixString;
            case 'qys':
                if (this.Pitches.length === 1) {
                    const pitch = this.Pitches[0];
                    return ''.concat(pitch.toString(), ...this.Suffix.map((suffix) => suffix.toString()));
                }
                else {
                    if (this.Arpeggio) {
                        return '['.concat(...this.Pitches.slice(0, -1).map((pitch) => pitch.toString()), '^', this.Pitches.last().toString(), ']', ...this.Suffix.map((suffix) => suffix.toString()));
                    }
                    else {
                        return '['.concat(...this.Pitches.map((pitch) => pitch.toString()), ']', ...this.Suffix.map((suffix) => suffix.toString()));
                    }
                }
        }
    }
};
Note.pattern = {
    qym: /^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*[.\-_]*/,
    qys: /^([0-7%xX][',b#]*|\[([0-7%xX][',b#]*)*(\^[0-7%xX][',b#]*)?\][',b#]*)[.\-_`]*/,
};
Note = __decorate([
    Token
], Note);
export { Note };
//# sourceMappingURL=Note.js.map