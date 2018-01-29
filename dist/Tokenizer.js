import { Global } from './Global';
import { LineTokenizer } from './LineTokenizer';
import { TokenizedData } from './TokenizedData';
import { Comment } from './tokens/Comment';
import { FunctionToken } from './tokens/Function';
import { MeasureBound } from './tokens/MeasureBound';
import { Section } from './tokens/Section';
class Tokenizer {
    constructor(content) {
        this.tokenizedLines = [];
        this.content = content;
        this.tokenizedData = new TokenizedData();
        this.lineTok = new LineTokenizer();
        this.lines = this.content.split('\n');
        this.state = this.lineTok.getInitialState();
    }
    static tokenize(content, patterns = Global.TokenPatterns) {
        return LineTokenizer.tokenize(content, patterns);
    }
    static isCommentLine(tokenizedLine) {
        return (tokenizedLine.tokens.length === 1) && (tokenizedLine.tokens[0] instanceof Comment);
    }
    static isInitLine(tokenizedLine) {
        return tokenizedLine.tokens.every((token) => token instanceof FunctionToken);
    }
    tokenize() {
        this.tokenizeLines();
        if (Global.CurrentFormat === 'qym') {
            this.processQym();
        }
        else {
            this.processQys();
        }
        return this.tokenizedData;
        /*const pre = new Preprocessor(this.content)
        const {comments, content} = pre.preprocess()
        this.tokenizedData.Comments = comments
        this.content = content
        this.tokenizedData.Sections = Tokenizer.tokenize(this.content, Global.StructurePatterns)*/
    }
    tokenizeLines() {
        this.lines.forEach((line) => {
            const tokens = this.lineTok.tokenize(line, this.state /*.clone()*/);
            this.tokenizedLines.push(tokens);
            this.state = tokens.endState;
        });
    }
    processQym() {
        const splitted = this.tokenizedLines.split((line) => line.tokens.length === 0);
        if (splitted[0].every((line) => Tokenizer.isCommentLine(line))) {
            this.tokenizedData.Comments = [].concat(...splitted[0].map((line) => line.tokens[0]));
            this.tokenizedData.Sections = splitted.slice(1).map((lines) => new Section(lines));
        }
        else {
            this.tokenizedData.Sections = splitted.map((lines) => new Section(lines));
        }
    }
    processQys() {
        const concatedLines = this.concatLines();
        const index = concatedLines.findIndex((line) => line.tokens.length === 0);
        if (index !== -1) {
            const possibleComments = concatedLines.slice(0, index);
            if (possibleComments.every((line) => Tokenizer.isCommentLine(line))) {
                this.tokenizedData.Comments = [].concat(...possibleComments.map((line) => line.tokens[0]));
                concatedLines.splice(0, index);
            }
        }
        let secParam = [];
        let secFlag = false;
        while (concatedLines.length > 0) {
            const line = concatedLines.shift();
            if (line.tokens.length === 0) {
                continue;
            }
            if (!Tokenizer.isCommentLine(line) && !Tokenizer.isInitLine(line)) {
                secFlag = true;
            }
            else if (secFlag) {
                this.tokenizedData.Sections.push(new Section(secParam));
                secParam = [];
                secFlag = false;
            }
            secParam.push(line);
        }
        if (secParam.length > 0) {
            this.tokenizedData.Sections.push(new Section(secParam));
        }
    }
    concatLines() {
        const result = [];
        let wrap = false;
        this.tokenizedLines.forEach((line) => {
            const state = line.endState;
            if (state.wrap) {
                if (line.tokens.slice(0, -1).every((token) => token instanceof FunctionToken)) {
                    line.tokens.splice(-1);
                }
                else {
                    const last2 = line.tokens.last(2);
                    if (last2 instanceof MeasureBound) {
                        last2.NewLine = true;
                        line.tokens.splice(-1);
                    }
                }
            }
            if (wrap) {
                const last = result.last();
                last.tokens.push(...line.tokens);
                last.endState = line.endState;
            }
            else {
                result.push(line);
            }
            wrap = state.wrap;
        });
        return result;
    }
}
export { Tokenizer };
//# sourceMappingURL=Tokenizer.js.map