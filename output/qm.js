"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qysFileParser_js_1 = require("./qysFileParser.js");
function play(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const qyContent = event.target.result;
        parseFile(qyContent);
    };
    reader.readAsText(file, 'UTF-8');
}
function parseFile(content) {
    const parser = new qysFileParser_js_1.qysFileParser(content);
    parser.parse();
}
//# sourceMappingURL=qm.js.map