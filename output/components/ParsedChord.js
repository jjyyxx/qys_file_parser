"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParsedChord {
    constructor(left, right) {
        if (left instanceof ParsedChord) {
            this.parsedStaffList = [...left.parsedStaffList, right];
        }
        else {
            this.parsedStaffList = [left, right];
        }
    }
}
exports.ParsedChord = ParsedChord;
//# sourceMappingURL=ParsedChord.js.map