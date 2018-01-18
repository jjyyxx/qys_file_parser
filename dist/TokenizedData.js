class TokenizedData {
    constructor() {
        this.Comments = [];
        this.Sections = [];
    }
    toString() {
        const commentString = this.Comments.length === 0
            ? ''
            : this.Comments
                .map((comment) => comment.toString())
                .reduce((pre, cur) => pre + cur, '') + '\n';
        const sectionString = this.Sections.map((section) => section.toString()).reduce((pre, cur) => pre + cur);
        return commentString + sectionString;
    }
}
export { TokenizedData };
//# sourceMappingURL=TokenizedData.js.map