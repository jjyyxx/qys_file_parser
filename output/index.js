"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// FIXME: find better way
// tslint:disable-next-line:no-var-requires
require('./Util');
// tslint:disable-next-line:no-var-requires
require('./Global');
var Detokenizer_1 = require("./Detokenizer");
exports.Detokenizer = Detokenizer_1.Detokenizer;
var qysFileParser_1 = require("./Old/qysFileParser");
exports.qysFileParser = qysFileParser_1.qysFileParser;
var Tokenizer_1 = require("./Tokenizer");
exports.Tokenizer = Tokenizer_1.Tokenizer;
__export(require("./tokens"));
//# sourceMappingURL=index.js.map