interface Array<T> {
    last(index?: number): T;
    split(func: (bound: T) => boolean, keep?: boolean): T[][];
}
interface Fraction {
    Numerator: number;
    Denominator: number;
}
interface String {
    calcOct(): number;
    toNumIfPossible(): (number | string);
    toFraction(): Fraction;
    isNumeric(): boolean;
}
interface ObjectConstructor {
    reverseFrom(KVArray: Array<{
        key: string;
        value: any;
    }>): object;
    getKeyByValue(object: object, value: any): any;
}
