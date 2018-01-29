import { BaseToken } from './tokens/BaseToken';
import { UnrecognizedToken } from './tokens/UnrecognizedToken';
declare class Global {
    static readonly TokenPatterns: {
        constuctor: new (...args: any[]) => BaseToken;
        pattern: RegExp;
    }[];
    static FallbackToken: typeof UnrecognizedToken;
    static supportedFormat: Set<string>;
    static CurrentFormat: string;
    static tonalityDict: {
        [key: string]: number;
    };
    static pitchDict: {
        [key: number]: number;
    };
    static legalTonality: Set<string>;
    static legalSettings: Set<string>;
    static SortedTonality: string[];
    static isLegalSetting(key: string): boolean;
    static isLegalTonality(key: string): boolean;
    static RegisterTokenPattern(constuctor: {
        new (...args: any[]): BaseToken;
    }, pattern: RegExp, format?: string): void;
    private static Format;
    private static tokenPatterns;
    private static initialize();
}
export { Global };
