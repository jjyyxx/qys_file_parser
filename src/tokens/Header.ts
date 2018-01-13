import { Tokenizer } from '../Tokenizer'
import { BaseStructure, BaseToken } from './BaseToken'
import { Comment } from './Comment'
import { Structure } from './TokenDecorator'
import { StructureType } from './TokenType'

@Structure
class Header extends BaseStructure {
    public static pattern = /^(\/\/.*\n| *\n)*/

    public commments: Comment[]
    constructor(matched: RegExpMatchArray) {
        super(StructureType.Header)
        this.commments = Tokenizer.tokenize(matched[0])
    }
}

export { Header }
