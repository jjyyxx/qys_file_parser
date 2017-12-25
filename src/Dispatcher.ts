class Dispatcher {
    context: qysParserContext
    constructor(context) {
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
        let possibleSpeed = parseInt(variable)
        if (possibleSpeed) {
            finalSetting.push({ key: 'Speed', value: possibleSpeed })
        } else {
            let possibleVolume = parseFloat(variable)
            if (possibleVolume) {
                finalSetting.push({ key: 'Volume', value: possibleVolume })
            } else {
                let possibleBeatTuple = variable.split("/")
                if (possibleBeatTuple.length === 2) {
                    let processedNum = possibleBeatTuple.map(possibleNum => parseInt(possibleNum)).filter(possibleNum => possibleNum)
                    if (processedNum.length === 2) {
                        finalSetting.push({ key: 'Bar', value: processedNum[0] }, { key: 'Beat', value: processedNum[1] })
                    } else {
                        throw "illegal variable"
                    }
                } else {
                    if (variable.startsWith('1=')) {
                        let possibleKey = variable.slice(2)
                        let slice = -1

                        for (const legalKey of GlobalSettings.SortedTonality) {
                            if (possibleKey.startsWith(legalKey)) {
                                slice = legalKey.length
                                finalSetting.push({ key: 'Key', value: possibleKey.slice(0, slice) })
                                break
                            }
                        }
                        if (slice === -1) {
                            throw "illegal tonality"
                        } else {
                            let possibleOct = possibleKey.slice(0, slice).calcOct()
                            if (Number.isNaN(possibleOct)) {
                                throw "illegal tonality"
                            } else {
                                finalSetting.push({ key: 'Oct', value: possibleOct })
                            }
                        }
                    } else {
                        let possibleKVPair = variable.split(':').map(item => item.trim())
                        if (possibleKVPair.length === 2 && GlobalSettings.isLegalSetting(possibleKVPair[0])) {
                            finalSetting.push({ key: possibleKVPair[0], value: possibleKVPair[1] })
                        } else {
                            throw "illegal variable"
                        }
                    }
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
}

import { qysParserContext } from "./qysParserContext.js";
import { StaffUnit } from "./StaffUnit.js";
import { GlobalSettings } from "./GlobalSettings";
import { Section } from "./Section";
export { Dispatcher }