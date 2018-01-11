import { Detokenizer } from './Detokenizer'
import { qysFileParser } from './Old/qysFileParser'
import { Tokenizer } from './Tokenizer'
import { PairType, SuffixType, TokenType } from './tokens/TokenType'
// FIXME: find better way
// tslint:disable-next-line:no-var-requires
require('./Util')

export { qysFileParser, Tokenizer, PairType, SuffixType, TokenType,  Detokenizer }
