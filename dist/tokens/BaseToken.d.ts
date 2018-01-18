import { StructureType, TokenType } from './TokenType';
declare abstract class Base<T> {
    readonly type: T;
    constructor(type: T);
}
declare class BaseToken extends Base<TokenType> {
}
declare class BaseStructure extends Base<StructureType> {
}
export { Base, BaseToken, BaseStructure };
