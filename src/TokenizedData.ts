import { Comment } from './tokens/Comment'
import { Section } from './tokens/Section'

class TokenizedData {
    public Comments: Comment[]
    public Sections: Section[]

    constructor() {
        this.Comments = []
        this.Sections = []
    }

    public toString() {
        const commentString = this.Comments.length === 0
            ? ''
            : this.Comments
                .map((comment) => comment.toString())
                .reduce((pre, cur) => pre + cur, '') + '\n'
        const sectionString = this.Sections.map((section) => section.toString()).reduce((pre, cur) => pre + cur)
        return commentString + sectionString
    }
}

export { TokenizedData }
