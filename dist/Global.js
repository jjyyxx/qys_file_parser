import { UnrecognizedToken } from './tokens/UnrecognizedToken';
class Global {
    static get TokenPatterns() {
        return Global.tokenPatterns[Global.CurrentFormat];
    }
    static get StructurePatterns() {
        return Global.structurePatterns[Global.CurrentFormat];
    }
    static get CurrentFormat() {
        return Global.Format;
    }
    static set CurrentFormat(format) {
        if (Global.supportedFormat.has(format)) {
            Global.Format = format;
        }
    }
    static isLegalSetting(key) {
        return Global.legalSettings.has(key);
    }
    static isLegalTonality(key) {
        return Global.legalTonality.has(key);
    }
    static RegisterTokenPattern(constuctor, pattern, format = '') {
        if (format === '') {
            for (const supportedFormat of Global.supportedFormat) {
                Global.tokenPatterns[supportedFormat].push({
                    constuctor,
                    pattern,
                });
            }
        }
        else {
            Global.tokenPatterns[format].push({
                constuctor,
                pattern,
            });
        }
    }
    static RegisterStructurePattern(constuctor, pattern, format = '') {
        if (format === '') {
            for (const supportedFormat of Global.supportedFormat) {
                Global.structurePatterns[supportedFormat].push({
                    constuctor,
                    pattern,
                });
            }
        }
        else {
            Global.structurePatterns[format].push({
                constuctor,
                pattern,
            });
        }
    }
    static initialize() {
        const obj = {};
        for (const format of Global.supportedFormat) {
            obj[format] = [];
        }
        return obj;
    }
}
Global.FallbackToken = UnrecognizedToken;
Global.supportedFormat = new Set(['qys', 'qym']);
Global.tonalityDict = {
    // tslint:disable-next-line:object-literal-sort-keys
    'C': 0, 'G': 7, 'D': 2, 'A': 9, 'E': 4,
    'B': -1, '#F': 6, '#C': 1, 'F': 5, 'bB': -2,
    'bE': 3, 'bA': 8, 'bD': 1, 'bG': 6, 'bC': -1,
    'F#': 6, 'C#': 1, 'Bb': -2, 'Gb': 6,
    'Eb': 3, 'Ab': 8, 'Db': 1, 'Cb': -1,
};
Global.pitchDict = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
Global.legalTonality = new Set(Object.keys(Global.tonalityDict));
Global.legalSettings = new Set([
    'Key', 'Bar', 'Beat', 'Speed', 'Volume', 'Instr', 'Stac',
    'Port', 'Appo', 'Dur', 'Oct', 'FadeIn', 'FadeOut',
]);
Global.SortedTonality = Object.keys(Global.tonalityDict).sort((a, b) => {
    return a.length > b.length ? -1 : 1;
});
Global.Format = 'qym';
Global.tokenPatterns = Global.initialize();
Global.structurePatterns = Global.initialize();
export { Global };
//# sourceMappingURL=Global.js.map