"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalSettings_1 = require("./GlobalSettings");
const StaffUnit_1 = require("./StaffUnit");
class Dispatcher {
    constructor(context) {
        this.context = context;
    }
    pitch(pitch) {
        this.context.addNewStaff(pitch);
    }
    '#'() {
        this.context.activeStaff.pitch += 1;
    }
    'b'() {
        this.context.activeStaff.pitch -= 1;
    }
    '\''() {
        this.context.activeStaff.pitch += 12;
    }
    ','() {
        this.context.activeStaff.pitch -= 12;
    }
    '%'() {
        const tempStaff = new StaffUnit_1.StaffUnit(0);
        Object.assign(tempStaff, this.context.activeStaff);
        this.context.addStaff(tempStaff);
    }
    '-'() {
        this.context.activeStaff.beatCount += 1;
    }
    '_'() {
        this.context.activeStaff.beatCount /= 2;
    }
    '.'() {
        this.context.activeStaff.dotCount += 1;
    }
    '|'() {
        // measure bound
    }
    '^'() {
        this.context.addTie();
        // TODO: deal with illegal input
    }
    // tslint:disable-next-line:no-empty
    '['() {
    }
    // tslint:disable-next-line:no-empty
    '('() {
    }
    '<'() {
        const variable = this.context.fetchUntil('>');
        const finalSetting = [];
        const possibleNum = Number(variable);
        if (possibleNum) {
            if (variable.includes('.')) {
                finalSetting.push({ key: 'Volume', value: possibleNum }); // volume
            }
            else {
                finalSetting.push({ key: 'Speed', value: possibleNum }); // parse speed
            }
        }
        else {
            const possibleBeatTuple = variable.toFraction();
            if (possibleBeatTuple) {
                finalSetting.push({ key: 'Bar', value: possibleBeatTuple.Numerator }, { key: 'Beat', value: possibleBeatTuple.Denominator });
            }
            else if (variable.startsWith('1=')) {
                const possibleKey = variable.slice(2);
                let slice = -1;
                for (const legalKey of GlobalSettings_1.GlobalSettings.SortedTonality) {
                    if (possibleKey.startsWith(legalKey)) {
                        slice = legalKey.length;
                        finalSetting.push({
                            key: 'Key',
                            value: GlobalSettings_1.GlobalSettings.tonalityDict[possibleKey.slice(0, slice)],
                        });
                        break;
                    }
                }
                if (slice === -1) {
                    throw new Error('illegal tonality');
                }
                else if (slice !== possibleKey.length) {
                    const possibleOct = possibleKey.slice(slice).calcOct();
                    if (Number.isNaN(possibleOct)) {
                        throw new Error('illegal tonality');
                    }
                    else {
                        finalSetting.push({ key: 'Oct', value: possibleOct });
                    }
                }
            }
            else {
                const possibleKVPair = variable.split(':').map((item) => item.trim());
                if (possibleKVPair.length === 2 && GlobalSettings_1.GlobalSettings.isLegalSetting(possibleKVPair[0])) {
                    finalSetting.push({ key: possibleKVPair[0], value: possibleKVPair[1].toNumIfPossible() });
                }
                else {
                    throw new Error('illegal variable');
                }
            }
        }
        const finalObj = Object.reverseFrom(finalSetting);
        if (this.context.activeSection) {
            if (this.context.activeSection.sequence.length === 0) {
                this.context.activeSection.setting.update(finalObj);
            }
            else {
                this.context.addNewSection(this.context.activeSection.setting.extend(finalObj));
            }
        }
        else {
            this.context.addNewSection(new GlobalSettings_1.GlobalSettings(finalObj));
        }
    }
    '/'() {
        const next = this.context.nextChar();
        if (next === '/') {
            this.context.fetchLine();
        }
        else {
            throw new Error('Unrecognizable notation. Do you mean // ?');
        }
    }
    // tslint:disable-next-line:no-empty
    ' '() {
    }
    // tslint:disable-next-line:no-empty
    '\n'() {
    }
}
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=Dispatcher.js.map