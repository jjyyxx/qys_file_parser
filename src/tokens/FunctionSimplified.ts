import { Global } from '../Global'
import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class FunctionSimplified extends BaseToken {
    public static pattern = /^<[^:>]+>/   // TODO: consider a more strict one

    public static parse(content: string) {
        const finalSetting: Array<{ key: string, value: any }> = []
        const possibleNum = Number(content)
        if (possibleNum) {
            if (content.includes('.')) {
                finalSetting.push({ key: 'Volume', value: possibleNum }) // volume
            } else {
                finalSetting.push({ key: 'Speed', value: possibleNum }) // parse speed
            }
        } else {
            const possibleBeatTuple = content.toFraction()
            if (possibleBeatTuple) {
                finalSetting.push(
                    { key: 'Bar', value: possibleBeatTuple.Numerator },
                    { key: 'Beat', value: possibleBeatTuple.Denominator },
                )
            } else if (content.startsWith('1=')) {
                const possibleKey = content.slice(2)
                let slice = -1
                for (const legalKey of Global.SortedTonality) {
                    if (possibleKey.startsWith(legalKey)) {
                        slice = legalKey.length
                        finalSetting.push({
                            key: 'Key',
                            value: Global.tonalityDict[possibleKey.slice(0, slice)],
                        })
                        break
                    }
                }
                if (slice === -1) {
                    throw new Error('illegal tonality')
                } else if (slice !== possibleKey.length) {
                    const possibleOct = possibleKey.slice(slice).calcOct()
                    if (Number.isNaN(possibleOct)) {
                        throw new Error('illegal tonality')
                    } else {
                        finalSetting.push({ key: 'Oct', value: possibleOct })
                    }
                }
            } else {
                throw new Error('illegal setting')
            }
        }
        return finalSetting
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
                return Number.isInteger(this.Argument as number)
                    ? this.Argument.toString() + '.0'
                    : this.Argument.toString()
            case 'Speed':
                return this.Argument.toString()
            case 'Bar&Beat':
                return (this.Argument as any).Bar.toString() + '/' + (this.Argument as any).Beat.toString()
            case 'Key':
                return `1=${Object.getKeyByValue(Global.tonalityDict, this.Argument)}`
            case 'Key&Oct':
                return ''   // FIXME: currently fail to support it
        }
    }
}

export { FunctionSimplified }
