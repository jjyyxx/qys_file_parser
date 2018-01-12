import { GlobalSettings } from '../GlobalSettings'
import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Setting extends BaseToken {
    public static pattern = /^<[^>]*>/     // TODO: 1. consider merge 2. more strict regex
    private static parseSetting(setting: string): Array<{ key: string, value: any }> {
        const finalSetting: Array<{ key: string, value: any }> = []
        const possibleNum = Number(setting)
        if (possibleNum) {
            if (setting.includes('.')) {
                finalSetting.push({ key: 'Volume', value: possibleNum }) // volume
            } else {
                finalSetting.push({ key: 'Speed', value: possibleNum }) // parse speed
            }
        } else {
            const possibleBeatTuple = setting.toFraction()
            if (possibleBeatTuple) {
                finalSetting.push(
                    { key: 'Bar', value: possibleBeatTuple.Numerator },
                    { key: 'Beat', value: possibleBeatTuple.Denominator },
                )
            } else if (setting.startsWith('1=')) {
                const possibleKey = setting.slice(2)
                let slice = -1
                for (const legalKey of GlobalSettings.SortedTonality) {
                    if (possibleKey.startsWith(legalKey)) {
                        slice = legalKey.length
                        finalSetting.push({
                            key: 'Key',
                            value: GlobalSettings.tonalityDict[possibleKey.slice(0, slice)],
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
                const possibleKVPair = setting.split(':').map((item) => item.trim())
                if (possibleKVPair.length === 2 && GlobalSettings.isLegalSetting(possibleKVPair[0])) {
                    finalSetting.push({ key: possibleKVPair[0], value: possibleKVPair[1].toNumIfPossible() })
                } else {
                    throw new Error('illegal variable')
                }
            }
        }
        return finalSetting
    }

    public readonly settings: Array<{ key: string, value: any }>

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Setting)
        this.settings = Setting.parseSetting(matched[0].slice(1, -1))
    }

    public toString(): string {
        return this.settings.map((value) => {
            switch (value.key) {
                case 'Volume':
                    return Number.isInteger(value.value) ? value.value.toString() + '.0' : value.value.toString()
                case 'Speed':
                case 'Bar':
                    return value.value.toString()
                case 'Beat':
                    return '/' + value.value.toString()
                case 'Key':
                    return `1=${Object.getKeyByValue(GlobalSettings.tonalityDict, value.value)}`
                case 'Oct':
                    return ''   // FIXME: currently fail to support it
                default:
                    return `${value.key}:${value.value}`
            }
        }).reduce((pre, cur) => pre + cur)
    }
}

export { Setting }
