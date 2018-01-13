import { Comment } from './tokens/Comment'
import { Section } from './tokens/Section'

class TokenizedData {
    public Comments: Comment[]
    public Sections: Section[]

    constructor() {
        this.Comments = []
        this.Sections = []
    }
}

export { TokenizedData }
