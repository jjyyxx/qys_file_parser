var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Tokenizer } from '../Tokenizer';
import { BaseStructure } from './BaseToken';
import { Structure } from './TokenDecorator';
import { StructureType } from './TokenType';
let Section = Section_1 = class Section extends BaseStructure {
    constructor(matched) {
        super(StructureType.Section);
        let content = matched[0];
        const { remainedContent, Comments } = Section_1.separateComments(content);
        content = remainedContent;
        this.Comments = Comments;
        const splitted = content.split('\n');
        if (splitted[0].search(/^([<{][^}>]*[>}])*$/) !== -1) {
            this.GlobalSettings = Tokenizer.tokenize(splitted[0]);
            this.Tracks = splitted.slice(1).filter((track) => track !== '').map((track) => Tokenizer.tokenize(track));
        }
        else {
            this.GlobalSettings = [];
            this.Tracks = splitted.map((track) => Tokenizer.tokenize(track));
        }
    }
    static separateComments(content) {
        const matchedGlobalComments = content.match(/^(\/\/.*\n)+/);
        let Comments;
        let remainedContent;
        if (matchedGlobalComments) {
            Comments = Tokenizer.tokenize(matchedGlobalComments[0]);
            remainedContent = content.slice(matchedGlobalComments[0].length);
        }
        else {
            Comments = [];
            remainedContent = content;
        }
        return {
            Comments,
            remainedContent,
        };
    }
    toString() {
        const commentString = this.Comments.map((comment) => comment.toString()).reduce((pre, cur) => pre + cur, '');
        const settingString = this.GlobalSettings.length === 0
            ? ''
            : this.GlobalSettings
                .map((functionToken) => functionToken.toString())
                .reduce((pre, cur) => pre + cur, '') + '\n\n';
        const trackString = this.Tracks
            .map((track) => track
            .map((token) => token.toString())
            .reduce((pre, cur) => pre + cur) + '\n')
            .reduce((pre, cur) => pre + cur, '');
        return commentString + settingString + trackString + '\n';
    }
};
Section.pattern = {
    qym: /^(.+\n)*.+(\n\n|\n$|$)/,
    qys: /^(\/\/.+\n)*(<[^>]*>)*\n((<[^>]*>)*(\\\\)?[0-7%xX\(\[^~].*\n)*($|(?=(\/\/.+\n)*(<[^>]*>)*\n))/,
};
Section = Section_1 = __decorate([
    Structure
], Section);
export { Section };
var Section_1;
//# sourceMappingURL=Section.js.map