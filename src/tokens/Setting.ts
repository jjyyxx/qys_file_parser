import { GlobalSettings } from '../GlobalSettings'
import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Setting extends BaseToken {
    private static parseSetting(setting: string): Array<{}> {
        const finalSetting: Array<{}> = []
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

    public readonly setting: Array<{[Key: string]: any}>

    constructor(setting: string) {
        super(TokenType.Setting)
        this.setting = Setting.parseSetting(setting)
    }
}

export { Setting }
