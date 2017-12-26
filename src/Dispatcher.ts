import { qysParserContext } from "./qysParserContext";
import { StaffUnit } from "./StaffUnit";
import { GlobalSettings } from "./GlobalSettings";
import { Section } from "./Section";
export { Dispatcher }

class Dispatcher {
    [key: string]: any
    context: qysParserContext
    constructor(context: qysParserContext) {
        this.context = context
    }

    pitch(pitch: number) {
        this.context.addNewStaff(pitch)
    }

    '#'() {
        this.context.activeStaff.pitch += 1
    }

    'b'() {
        this.context.activeStaff.pitch -= 1
    }

    "'"() {
        this.context.activeStaff.pitch += 12
    }

    ','() {
        this.context.activeStaff.pitch -= 12
    }

    '%'() {
        let tempStaff: StaffUnit = new StaffUnit(0);
        Object.assign(tempStaff, this.context.activeStaff)
        this.context.addStaff(tempStaff)
    }

    '-'() {
        this.context.activeStaff.beatCount += 1
    }

    '_'() {
        this.context.activeStaff.beatCount /= 2
    }

    '.'() {
        this.context.activeStaff.dotCount += 1
    }

    '|'() {
        // measure bound
    }

    '^'() {
        this.context.addTie()
        // TODO: deal with illegal input
    }

    '['() {

    }

    '('() {

    }

    '<'() {
        let variable = this.context.fetchUntil('>')
        let finalSetting = []
        let possibleNum = Number(variable)
        if (possibleNum) {
            if (variable.includes('.')) {
                finalSetting.push({ key: 'Volume', value: possibleNum }) // volume
            } else {
                finalSetting.push({ key: 'Speed', value: possibleNum }) // parse speed
            }
        } else {
            let possibleBeatTuple = variable.toFraction()
            if (possibleBeatTuple) {
                    finalSetting.push({ key: 'Bar', value: possibleBeatTuple.Numerator }, { key: 'Beat', value: possibleBeatTuple.Denominator })
            } else if (variable.startsWith('1=')) {
                let possibleKey = variable.slice(2)
                let slice = -1
                for (const legalKey of GlobalSettings.SortedTonality) {
                    if (possibleKey.startsWith(legalKey)) {
                        slice = legalKey.length
                        finalSetting.push({ key: 'Key', value: GlobalSettings.tonalityDict[possibleKey.slice(0, slice)] })
                        break
                    }
                }
                if (slice === -1) {
                    throw "illegal tonality"
                } else if (slice !== possibleKey.length) {
                    let possibleOct = possibleKey.slice(slice).calcOct()
                    if (Number.isNaN(possibleOct)) {
                        throw "illegal tonality"
                    } else {
                        finalSetting.push({ key: 'Oct', value: possibleOct })
                    }
                }
            } else {
                let possibleKVPair = variable.split(':').map(item => item.trim())
                if (possibleKVPair.length === 2 && GlobalSettings.isLegalSetting(possibleKVPair[0])) {
                    finalSetting.push({ key: possibleKVPair[0], value: possibleKVPair[1].toNumIfPossible() })
                } else {
                    throw "illegal variable"
                }
            }
        }

        let finalObj = Object.reverseFrom(finalSetting)
        if (this.context.activeSection) {
            if (this.context.activeSection.sequence.length === 0) {
                this.context.activeSection.setting.update(finalObj)
            } else {
                this.context.addNewSection(this.context.activeSection.setting.extend(finalObj))
            }
        } else {
            this.context.addNewSection(new GlobalSettings(finalObj))
        }
    }

    '/'() {
        let next = this.context.nextChar()
        if (next === '/') {
            this.context.fetchLine()
        } else {
            throw "Unrecognizable notation. Do you mean // ?"
        }
    }
}

