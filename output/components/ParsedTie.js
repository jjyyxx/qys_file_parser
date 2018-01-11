"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParsedTie {
    constructor(left, right) {
        if (left instanceof ParsedTie) {
            this.parsedStaffList = [...left.parsedStaffList, right];
        }
        else {
            this.parsedStaffList = [left, right];
        }
    }
}
exports.ParsedTie = ParsedTie;
//# sourceMappingURL=ParsedTie.js.map