# qys_file_parser
A WIP parser for qys files written in TypeScript. It is wriiten in TypeScript and can be transpiled into ES6/CommonJS/AMD module style.



Here is an brief example illustrating the usage.

```javascript
let qysFileParser = require('qys_file_parser').qysFileParser
const str = `//东方红
//陕北民歌
<1=F><2/4><90>
55_^6_|2-|11_^6,_|2-|55|6_^1'_6_5_|11_^6,_|2-|52|17,_^6,_|5,5|23_2_|11_^6,_|2_3_2_1_|2_^1_7,_^6,_|5,-^|5,0||` // change to another file
let parser = new qysFileParser(str)
let context = parser.parse()

// deal with the context...
```

Project Structure:

| File name           | Function                                 |
| :------------------ | ---------------------------------------- |
| index.ts            | Entry point of project                   |
| qysFileParser.ts    | The main parser                          |
| qysParserContext.ts | The context class which stores all information retrieved from the qys file |
| Dispatcher.ts       | Define methods to deal with all tokens   |
| GlobalSettings.ts   | Class to store settings                  |
| StaffUnit.ts        | Staff Unit                               |
| Tie.ts              | ^ token                                  |
| Section.ts          | Sections with different setting          |
| Util.ts             | Util functions                           |

