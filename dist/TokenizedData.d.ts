import { Comment } from './tokens/Comment';
import { Section } from './tokens/Section';
declare class TokenizedData {
    Comments: Comment[];
    Sections: Section[];
    constructor();
    toString(): string;
}
export { TokenizedData };
