import { StructureType, TokenType } from './TokenType'

abstract class Base<T> {
    public readonly type: T
    constructor(type: T) {
        this.type = type
    }
}

// tslint:disable-next-line:max-classes-per-file
class BaseToken extends Base<TokenType> {}

// tslint:disable-next-line:max-classes-per-file
class BaseStructure extends Base<StructureType> {}

export { Base, BaseToken, BaseStructure }
