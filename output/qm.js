import { qysFileParser } from './qysFileParser.js';
function play(file) {
    let reader = new FileReader();
    reader.onload = (event) => {
        let qyContent = event.target.result;
        parseFile(qyContent);
    };
    reader.readAsText(file, 'UTF-8');
}
function parseFile(content) {
    let parser = new qysFileParser(content);
    parser.parse();
}
