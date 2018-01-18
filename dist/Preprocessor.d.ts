import { Comment } from './tokens/Comment';
declare class Preprocessor {
    content: string;
    comments: Comment[];
    constructor(content: string);
    preprocess(): {
        comments: Comment[];
        content: string;
    };
    private adjustStyle();
    private separateGlobalComments();
}
export { Preprocessor };
