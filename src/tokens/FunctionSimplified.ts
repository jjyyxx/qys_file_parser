import { Global } from '../Global'
import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class FunctionSimplified extends BaseToken {
    public static pattern = /^(<[^:>]+>|{[^}]+})/   // TODO: consider a more strict one

    public static parse(content: string) {
        const finalSetting: Array<{ key: string, value: any }> = []
        if (content.isNumeric()) {
            if (content.includes('.')) {
                return [{ key: 'Volume', value: Number(content) }]
            }
            return [{ key: 'Speed', value: Number(content) }]
        }
        if (content.endsWith('%') && content.slice(0, -1).isNumeric()) {
            return [{ key: 'Volume', value: Number(content.slice(0, -1)) / 100 }]
        }
        const possibleBeatTuple = content.toFraction()
        if (possibleBeatTuple) {
            return [
                { key: 'Bar', value: possibleBeatTuple.Numerator },
                { key: 'Beat', value: possibleBeatTuple.Denominator },
            ]
        }
        if (content.startsWith('1=')) {
            const result = FunctionSimplified.parseTonality(content.slice(2))
            if (result) {
                return result
            } else {
                throw new Error('illegal setting')
            }
        }
        if (content.startsWith('{') && content.endsWith('}')) {
            return [
                { key: 'Instr', value: content.slice(1, -1) as any },
            ]
        }
        throw new Error('illegal setting')
    }

    private static parseTonality(possibleKey: string) {
        if (possibleKey.endsWith('\'')) {
            const result = FunctionSimplified.calcOctave(possibleKey, '\'')
            if (result) {
                return [
                    { key: 'Key', value: result.key },
                    { key: 'Oct', value: result.octave },
                ]
            } else {
                return undefined
            }
        } else if (possibleKey.endsWith(',')) {
            const result = FunctionSimplified.calcOctave(possibleKey, ',')
            if (result) {
                return [
                    { key: 'Key', value: result.key },
                    { key: 'Oct', value: -result.octave },
                ]
            } else {
                return undefined
            }
        } else if (Global.isLegalTonality(possibleKey)) {
            return [{
                key: 'Key',
                value: Global.tonalityDict[possibleKey],
            }]
        } else {
            return undefined
        }
    }

    private static calcOctave(content: string, char: string) {
        const firstOccurance = content.indexOf(char)
        const remain = content.slice(0, firstOccurance)
        if (Global.isLegalTonality(remain)) {
            return {
                key: Global.tonalityDict[remain],
                octave: content.length - firstOccurance,
            }
        } else {
            return undefined
        }
    }

    public Name: string
    public Argument: string | number | {}

    constructor(matched: RegExpMatchArray) {
        super(TokenType.FunctionSimplified)
        const KVArray = FunctionSimplified.parse(matched[0].slice(1, -1))
        if (KVArray.length === 1) {
            this.Name = KVArray[0].key
            this.Argument = KVArray[0].value
        } else {
            this.Name = KVArray.map((KVPair) => KVPair.key).reduce((pre, cur) => `${pre}&${cur}`)
            this.Argument = Object.reverseFrom(KVArray)
        }
    }

    public toString(): string {
        return `<${this.reverse()}>`
    }

    private reverse(): string {
        switch (this.Name) {
            case 'Volume':
                switch (Global.CurrentFormat) {
                    case 'qym':
                        return ((this.Argument as number) * 100).toString() + '%'
                    case 'qys':
                        return Number.isInteger(this.Argument as number)
                            ? this.Argument.toString() + '.0'
                            : this.Argument.toString()
                }
            case 'Speed':
                return this.Argument.toString()
            case 'Bar&Beat':
                return (this.Argument as any).Bar.toString() + '/' + (this.Argument as any).Beat.toString()
            case 'Key':
                return `1=${Object.getKeyByValue(Global.tonalityDict, this.Argument)}`
            case 'Key&Oct':
                const octave = (this.Argument as any).Oct
                const suffix = octave > 0 ? '\''.repeat(octave) : ','.repeat(-octave)
                return `1=${Object.getKeyByValue(Global.tonalityDict, (this.Argument as any).Key)}${suffix}`
        }
    }
}

export { FunctionSimplified }
