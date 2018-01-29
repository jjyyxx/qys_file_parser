import { Global } from '../Global';
import { Tokenizer } from '../Tokenizer';
import { SuffixType } from './TokenType';
class Pitch {
    constructor(pitch) {
        const { scaleDegree, suffix } = Global.CurrentFormat === 'qym' ? Pitch.parseQymPitch(pitch) : Pitch.parseQysPitch(pitch);
        this.ScaleDegree = scaleDegree;
        this.Suffix = suffix;
    }
    static parseQymPitch(pitch) {
        const index = pitch.search(/[0-7%]/);
        const scaleDegree = pitch.charAt(index);
        return {
            scaleDegree: scaleDegree === '%' ? -1 : Number(scaleDegree),
            suffix: Tokenizer.tokenize(pitch.slice(0, index) + pitch.slice(index + 1)),
        };
    }
    static parseQysPitch(pitch) {
        return {
            scaleDegree: pitch[0] === '%' ? -1 :
                (pitch[0] === 'x' || pitch[0] === 'X') ? 8 : Number(pitch[0]),
            suffix: Tokenizer.tokenize(pitch.slice(1)),
        };
    }
    toString() {
        switch (Global.CurrentFormat) {
            case 'qym':
                const pitchIndex = this.Suffix.findIndex((suffix) => suffix.suffixType !== SuffixType.Flat && suffix.suffixType !== SuffixType.Sharp);
                return ''.concat(...this.Suffix.slice(1, pitchIndex).map((suffix) => suffix.toString()), this.ScaleDegree === -1 ? '%' : this.ScaleDegree.toString(), ...this.Suffix.slice(pitchIndex).map((suffix) => suffix.toString()));
            case 'qys':
                return ''.concat(this.ScaleDegree === -1 ? '%' : this.ScaleDegree === 8 ? 'x' : this.ScaleDegree.toString(), ...this.Suffix.map((suffix) => suffix.toString()));
        }
    }
}
Pitch.pattern = {
    qym: /^[b#]*[0-7%][',]/,
    qys: /^[0-7%xX][',b#]*/,
};
export { Pitch };
//# sourceMappingURL=Pitch.js.map