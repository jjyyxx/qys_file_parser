import { Tokenizer } from '../Tokenizer'
import { BaseStructure, BaseToken } from './BaseToken'
import { GlobalSettings } from './GlobalSettings'
import { Structure } from './TokenDecorator'
import { StructureType } from './TokenType'

type Track = BaseToken[]

@Structure
class Section extends BaseStructure {
    public static pattern = /^[<0-7](.+\n)*(.*)(\n|\n\n|$)/

    public globalSettings: GlobalSettings
    public tracks: Track[]
    constructor(matched: RegExpMatchArray) {
        super(StructureType.Section)
        const splitted = matched[0].split('\n')
        if (splitted[0].startsWith('<')) {
            this.globalSettings = new GlobalSettings(splitted[0])
            this.tracks = splitted.slice(1).filter((track) => track !== '').map((track) => Tokenizer.tokenize(track))
        } else {
            this.globalSettings = new GlobalSettings()
            this.tracks = splitted.map((track) => Tokenizer.tokenize(track))
        }
    }
}

export { Section }
