import {qysFileParser} from './qysFileParser.js'

function play(file : File){
    let reader : FileReader = new FileReader()
    reader.onload = (event : Event & { target: { result: string }} ) => {
        let qyContent = event.target.result
        parseFile(qyContent)
    }
    reader.readAsText(file, 'UTF-8')
}

function parseFile(content : string){
    let parser = new qysFileParser(content)
    parser.parse()
}