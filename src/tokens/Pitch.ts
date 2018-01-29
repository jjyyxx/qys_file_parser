import { Global } from '../Global'
import { Tokenizer } from '../Tokenizer'
import { Suffix } from './Suffix'
import { Token } from './TokenDecorator'
import { SuffixType, TokenType } from './TokenType'

class Pitch {
    public static pattern = {
        qym: /^[b#]*[0-7%][',]/,
        qys: /^[0-7%xX][',b#]*/,
    }

    private static parseQymPitch(pitch: string) {
        const index = pitch.search(/[0-7%]/)
        const scaleDegree = pitch.charAt(index)
        return {
            scaleDegree: scaleDegree === '%' ? -1 : Number(scaleDegree),
            suffix: Tokenizer.tokenize<Suffix>(pitch.slice(0, index) + pitch.slice(index + 1)),
        }
    }

    private static parseQysPitch(pitch: string) {
        return {
            scaleDegree: pitch[0] === '%' ? -1 :
                (pitch[0] === 'x' || pitch[0] === 'X') ? 8 : Number(pitch[0]),
            suffix: Tokenizer.tokenize<Suffix>(pitch.slice(1)),
        }
    }

    public ScaleDegree: number
    public Suffix: Suffix[]
    constructor(pitch: string) {
        const { scaleDegree, suffix } =
            Global.CurrentFormat === 'qym' ? Pitch.parseQymPitch(pitch) : Pitch.parseQysPitch(pitch)
        this.ScaleDegree = scaleDegree
        this.Suffix = suffix
    }

    public toString(): string {
        switch (Global.CurrentFormat) {
            case 'qym':
                const pitchIndex = this.Suffix.findIndex((suffix) =>
                    suffix.suffixType !== SuffixType.Flat && suffix.suffixType !== SuffixType.Sharp)
                return ''.concat(
                    ...this.Suffix.slice(1, pitchIndex).map((suffix) => suffix.toString()),
                    this.ScaleDegree === -1 ? '%' : this.ScaleDegree.toString(),
                    ...this.Suffix.slice(pitchIndex).map((suffix) => suffix.toString()),
                )
            case 'qys':
                return ''.concat(
                    this.ScaleDegree === -1 ? '%' : this.ScaleDegree === 8 ? 'x' : this.ScaleDegree.toString(),
                    ...this.Suffix.map((suffix) => suffix.toString()),
                )
        }
    }
}

export { Pitch }
