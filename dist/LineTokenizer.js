import { Global } from './Global';
import { State } from './State';
import { Tokenizer } from './Tokenizer';
class LineTokenizer {
    static tokenize(content, patterns = Global.TokenPatterns) {
        const result = [];
        const oriLength = content.length;
        while (content.length > 0) {
            const startIndex = oriLength - content.length;
            const matchedPattern = patterns.find((patternObj) => patternObj.pattern.test(content));
            if (matchedPattern) {
                const matchedText = content.match(matchedPattern.pattern);
                try {
                    result.push(new matchedPattern.constuctor(startIndex, matchedText));
                }
                catch (error) {
                    result.push(new Global.FallbackToken(startIndex, matchedText[0]));
                }
                content = content.slice(matchedText[0].length);
            }
            else {
                result.push(new Global.FallbackToken(startIndex, content.charAt(0)));
                content = content.slice(1);
            }
        }
        return result;
    }
    tokenize(line, state) {
        const endState = new State({ wrap: line.endsWith('\\') && !line.startsWith('//') });
        return {
            tokens: Tokenizer.tokenize(line),
            endState,
        };
    }
    /*public tokenize(): TokenizedData {
        const pre = new Preprocessor(this.content)
        const {comments, content} = pre.preprocess()
        this.tokenizedData.Comments = comments
        this.content = content
        this.tokenizedData.Sections = Tokenizer.tokenize(this.content, Global.StructurePatterns)
        return this.tokenizedData
    }*/
    getInitialState() {
        return new State();
    }
}
export { LineTokenizer };
//# sourceMappingURL=LineTokenizer.js.map