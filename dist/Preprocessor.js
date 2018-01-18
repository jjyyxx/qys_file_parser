import { Global } from './Global';
import { Tokenizer } from './Tokenizer';
class Preprocessor {
    constructor(content) {
        this.content = content;
    }
    preprocess() {
        this.separateGlobalComments();
        if (Global.CurrentFormat === 'qys') {
            this.adjustStyle();
        }
        return {
            comments: this.comments,
            content: this.content,
        };
    }
    adjustStyle() {
        this.content = this.content.replace(/\n+/g, '\n').replace(/\\\n/g, '\\\\');
        if (this.content.charAt(this.content.length - 1) !== '\n') {
            this.content += '\n';
        }
    }
    separateGlobalComments() {
        const matchedGlobalComments = this.content.match(/^(\/\/.*\n)+\n/);
        if (matchedGlobalComments) {
            this.comments = Tokenizer.tokenize(matchedGlobalComments[0].slice(0, -1));
            this.content = this.content.slice(matchedGlobalComments[0].length);
        }
        else {
            this.comments = [];
        }
    }
}
export { Preprocessor };
//# sourceMappingURL=Preprocessor.js.map