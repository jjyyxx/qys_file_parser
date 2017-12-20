import { staffUnit } from './staffUnit.js';
export { qysFileParser };
class qysFileParser {
    get rawContent() {
        return this._rawContent;
    }
    set rawContent(content) {
    }
    constructor(content) {
        this._rawContent = content;
        this.length = this._rawContent.length;
    }
    parse() {
        for (let i = 0; i < this.length; i++) {
            let staff = new staffUnit();
            staff.staff = this.getChar(i);
            this.result.push(staff);
        }
    }
    getChar(index) {
        return this._rawContent.charAt(index);
    }
}
