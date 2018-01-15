import { Tokenizer } from '../Tokenizer'
import { BaseStructure, BaseToken } from './BaseToken'
import { Comment } from './Comment'
import { FunctionToken } from './Function'
import { FunctionSimplified } from './FunctionSimplified'
import { Structure } from './TokenDecorator'
import { StructureType } from './TokenType'

export type Track = BaseToken[]

@Structure
class Section extends BaseStructure {
    public static pattern = /^(.+\n)*.+(\n\n|\n$|$)/                  // /^[<0-7](.+\n)*(.*)(\n|\n\n|$)/

    public static separateComments(content: string) {
        const matchedGlobalComments = content.match(/^(\/\/.*\n)+/)
        let Comments: Comment[]
        let remainedContent
        if (matchedGlobalComments) {
            Comments = Tokenizer.tokenize(matchedGlobalComments[0])
            remainedContent = content.slice(matchedGlobalComments[0].length)
        } else {
            Comments = []
            remainedContent = content
        }
        return {
            Comments,
            remainedContent,
        }
    }

    public GlobalSettings: Array<FunctionToken | FunctionSimplified>
    public Comments: Comment[]
    public Tracks: Track[]
    constructor(matched: RegExpMatchArray) {
        super(StructureType.Section)
        let content = matched[0]
        const { remainedContent, Comments } = Section.separateComments(content)
        content = remainedContent
        this.Comments = Comments

        const splitted = content.split('\n')
        if (splitted[0].startsWith('<')) {
            this.GlobalSettings = Tokenizer.tokenize(splitted[0])
            this.Tracks = splitted.slice(1).filter((track) => track !== '').map((track) => Tokenizer.tokenize(track))
        } else {
            this.GlobalSettings = []
            this.Tracks = splitted.map((track) => Tokenizer.tokenize(track))
        }
    }

    public toString() {
        const commentString = this.Comments.map((comment) => comment.toString()).reduce((pre, cur) => pre + cur, '')
        const settingString = this.GlobalSettings.length === 0
            ? ''
            : this.GlobalSettings
                .map((functionToken) => functionToken.toString())
                .reduce((pre, cur) => pre + cur, '') + '\n'
        const trackString = this.Tracks
            .map((track) => track
                .map((token) => token.toString())
                .reduce((pre, cur) => pre + cur) + '\n')
            .reduce((pre, cur) => pre + cur, '')
        return commentString + settingString + trackString + '\n'
    }
}

export { Section }
