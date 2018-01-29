import { ILineTokens } from '../LineTokenizer'
import { Tokenizer } from '../Tokenizer'
import { BaseToken } from './BaseToken'
import { Comment } from './Comment'
import { FunctionToken } from './Function'

export type Track = BaseToken[]

class Section {
    public static pattern = {
        qym: /^(.+\n)*.+(\n\n|\n$|$)/,
        qys: /^(\/\/.+\n)*(<[^>]*>)*\n((<[^>]*>)*(\\\\)?[0-7%xX\(\[^~].*\n)*($|(?=(\/\/.+\n)*(<[^>]*>)*\n))/,
    }

    public static separateComments(content: ILineTokens[]) {
        const Comments: Comment[] = []
        let commentFlag = true
        let index = 0
        while (commentFlag) {
            const line = content[index]
            if (Tokenizer.isCommentLine(line)) {
                Comments.push(...(line.tokens) as any)
                index += 1
            } else {
                commentFlag = false
            }
        }
        const remainedContent = content.slice(index)
        return {
            Comments,
            remainedContent,
        }
    }

    public GlobalSettings: FunctionToken[]
    public Comments: Comment[]
    public Tracks: Track[]
    constructor(content: ILineTokens[]) {
        const { remainedContent, Comments } = Section.separateComments(content)
        content = remainedContent
        this.Comments = Comments
        if (Tokenizer.isInitLine(content[0])) {
            this.GlobalSettings = content[0].tokens as any[]
            this.Tracks = content.slice(1).map((line) => line.tokens) as any[][]
        } else {
            this.GlobalSettings = []
            this.Tracks = content.map((line) => line.tokens) as any[][]
        }
    }

    public toString() {
        const commentString = this.Comments.map((comment) => comment.toString()).reduce((pre, cur) => pre + cur, '')
        const settingString = this.GlobalSettings.length === 0
            ? ''
            : this.GlobalSettings
                .map((functionToken) => functionToken.toString())
                .reduce((pre, cur) => pre + cur, '') + '\n\n'
        const trackString = this.Tracks
            .map((track) => track
                .map((token) => token.toString())
                .reduce((pre, cur) => pre + cur) + '\n')
            .reduce((pre, cur) => pre + cur, '')
        return commentString + settingString + trackString + '\n'
    }
}

export { Section }
