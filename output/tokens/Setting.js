"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalSettings_1 = require("../GlobalSettings");
const BaseToken_1 = require("./BaseToken");
const TokenType_1 = require("./TokenType");
class Setting extends BaseToken_1.BaseToken {
    static parseSetting(setting) {
        const finalSetting = [];
        const possibleNum = Number(setting);
        if (possibleNum) {
            if (setting.includes('.')) {
                finalSetting.push({ key: 'Volume', value: possibleNum }); // volume
            }
            else {
                finalSetting.push({ key: 'Speed', value: possibleNum }); // parse speed
            }
        }
        else {
            const possibleBeatTuple = setting.toFraction();
            if (possibleBeatTuple) {
                finalSetting.push({ key: 'Bar', value: possibleBeatTuple.Numerator }, { key: 'Beat', value: possibleBeatTuple.Denominator });
            }
            else if (setting.startsWith('1=')) {
                const possibleKey = setting.slice(2);
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
                const possibleKVPair = setting.split(':').map((item) => item.trim());
                if (possibleKVPair.length === 2 && GlobalSettings_1.GlobalSettings.isLegalSetting(possibleKVPair[0])) {
                    finalSetting.push({ key: possibleKVPair[0], value: possibleKVPair[1].toNumIfPossible() });
                }
                else {
                    throw new Error('illegal variable');
                }
            }
        }
        return finalSetting;
    }
    constructor(settings) {
        super(TokenType_1.TokenType.Setting);
        this.settings = Setting.parseSetting(settings);
    }
    toString() {
        return this.settings.map((value) => {
            switch (value.key) {
                case 'Volume':
                    return Number.isInteger(value.value) ? value.value.toString() + '.0' : value.value.toString();
                case 'Speed':
                case 'Bar':
                    return value.value.toString();
                case 'Beat':
                    return '/' + value.value.toString();
                case 'Key':
                    return `1=${Object.getKeyByValue(GlobalSettings_1.GlobalSettings.tonalityDict, value.value)}`;
                case 'Oct':
                    return ''; // FIXME: currently fail to support it
                default:
                    return `${value.key}:${value.value}`;
            }
        }).reduce((pre, cur) => pre + cur);
    }
}
exports.Setting = Setting;
//# sourceMappingURL=Setting.js.map