import { Global } from './Global';
import { Preprocessor } from './Preprocessor';
import { TokenizedData } from './TokenizedData';
class Tokenizer {
    static tokenize(content, patterns = Global.TokenPatterns) {
        const result = [];
        while (content.length > 0) {
            const matchedPattern = patterns.find((patternObj) => patternObj.pattern.test(content));
            if (matchedPattern) {
                const matchedText = content.match(matchedPattern.pattern);
                try {
                    result.push(new matchedPattern.constuctor(matchedText));
                }
                catch (error) {
                    result.push(new Global.FallbackToken(matchedText[0])); // FIXME: better way
                }
                content = content.slice(matchedText[0].length);
            }
            else {
                result.push(new Global.FallbackToken(content.charAt(0))); // FIXME: better way
                content = content.slice(1);
            }
        }
        return result;
    }
    constructor(content) {
        this.content = content;
        this.tokenizedData = new TokenizedData();
    }
    tokenize() {
        const pre = new Preprocessor(this.content);
        const { comments, content } = pre.preprocess();
        this.tokenizedData.Comments = comments;
        this.content = content;
        this.tokenizedData.Sections = Tokenizer.tokenize(this.content, Global.StructurePatterns);
        return this.tokenizedData;
    }
}
export { Tokenizer };
//# sourceMappingURL=Tokenizer.js.map