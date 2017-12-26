import { qysFileParser } from "./qysFileParser.js"

function play(file: File) {
    const reader: FileReader = new FileReader()
    reader.onload = (event: Event & { target: { result: string } }) => {
        const qyContent = event.target.result
        parseFile(qyContent)
    }
    reader.readAsText(file, "UTF-8")
}

function parseFile(content: string) {
    const parser = new qysFileParser(content)
    parser.parse()
}
