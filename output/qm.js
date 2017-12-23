"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qysFileParser_js_1 = require("./qysFileParser.js");
function play(file) {
    let reader = new FileReader();
    reader.onload = (event) => {
        let qyContent = event.target.result;
        parseFile(qyContent);
    };
    reader.readAsText(file, 'UTF-8');
}
function parseFile(content) {
    let parser = new qysFileParser_js_1.qysFileParser(content);
    parser.parse();
}
