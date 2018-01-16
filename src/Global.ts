import { BaseStructure, BaseToken } from './tokens/BaseToken'
import { TokenType } from './tokens/TokenType'
import { UnrecognizedToken } from './tokens/UnrecognizedToken'

class Global {
    public static TokenPatterns: Array<{ constuctor: { new(...args: any[]): BaseToken }, pattern: RegExp }> = []
    public static StructurePatterns: Array<{ constuctor: { new(...args: any[]): BaseStructure }, pattern: RegExp }> = []
    public static FallbackToken = UnrecognizedToken
    public static supportedFormat = new Set(['qys', 'qym'])

    public static get CurrentFormat() {
        return Global.Format
    }

    public static set CurrentFormat(format: string) {
        if (Global.supportedFormat.has(format)) {
            Global.Format = format
        }
    }

    public static tonalityDict: { [key: string]: number } = {
        // tslint:disable-next-line:object-literal-sort-keys
        'C': 0, 'G': 7, 'D': 2, 'A': -3, 'E': 4,
        'B': -1, '#F': 6, '#C': 1, 'F': 5, 'bB': -2,
        'bE': 3, 'bA': -4, 'bD': 1, 'bG': 6, 'bC': -1,
        'F#': 6, 'C#': 1, 'Bb': -2, 'Gb': 6,
        'Eb': 3, 'Ab': -4, 'Db': 1, 'Cb': -1,
    }
    public static pitchDict: { [key: number]: number } = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 }
    public static legalTonality = new Set(Object.keys(Global.tonalityDict))
    public static legalSettings = new Set([
        'Key', 'Bar', 'Beat', 'Speed', 'Volume', 'Instr', 'Stac',
        'Port', 'Appo', 'Dur', 'Oct', 'FadeIn', 'FadeOut',
    ])
    public static SortedTonality: string[] = Object.keys(Global.tonalityDict).sort((a, b) => {
        return a.length > b.length ? -1 : 1
    })

    public static RegisterTokenPattern(constuctor: { new(...args: any[]): BaseToken },
                                       pattern: RegExp,
                                       format = '') {
        Global.TokenPatterns.push({
            constuctor,
            pattern,
        })
    }

    public static RegisterStructurePattern(constuctor: { new(...args: any[]): BaseStructure },
                                           pattern: RegExp,
                                           format = '') {
        Global.StructurePatterns.push({
            constuctor,
            pattern,
        })
    }

    public static isLegalSetting(key: string) {
        return Global.legalSettings.has(key)
    }

    public static isLegalTonality(key: string) {
        return Global.legalTonality.has(key)
    }

    private static Format: string = 'qym'
}

export { Global }
