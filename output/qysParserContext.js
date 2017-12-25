"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StaffUnit_1 = require("./StaffUnit");
const Tie_1 = require("./Tie");
const Section_1 = require("./Section");
const GlobalSettings_1 = require("./GlobalSettings");
class qysParserContext {
    constructor(content) {
        this.result = [];
        this.sections = [];
        // tie mode
        // tie: boolean = false
        this.ties = [];
        this.content = content;
        this.contentLength = this.content.length;
        this.pointer = 0;
    }
    nextChar(incPointer = true) {
        let ret = this.content.charAt(this.pointer);
        if (incPointer) {
            this.pointer += 1;
        }
        return ret;
    }
    fetchUntil(bound) {
        let buffer = '';
        let next;
        while ((next = this.nextChar()) !== bound) {
            buffer += next;
        }
        return buffer;
    }
    isEnded() {
        return this.pointer === this.contentLength;
    }
    addNewSection(setting = new GlobalSettings_1.GlobalSettings()) {
        this.addSection(new Section_1.Section(setting));
    }
    addSection(section) {
        this.sections.push(section);
    }
    addNewStaff(pitch) {
        if (this.sections.length === 0) {
            this.addNewSection();
        }
        this.addStaff(new StaffUnit_1.StaffUnit(pitch));
    }
    addStaff(staff) {
        this.previousCommit();
        this.activeSection.empty = false;
        this.activeSection.sequence.push(staff);
    }
    addTie() {
        let sectionLength = this.sections.length;
        let seqLength = this.activeSection.sequence.length;
        this.ties.push(new Tie_1.Tie(seqLength, seqLength + 1, sectionLength));
    }
    previousCommit() {
        if (this.sections[0].sequence.length !== 0) {
            this.activeStaff.commit();
        }
    }
    finalCommit() {
        this.previousCommit();
    }
    get activeStaff() {
        return this.activeSection.sequence.length === 0 ? this.sections.last(2).sequence.last() : this.activeSection.sequence.last();
    }
    get activeSection() {
        return this.sections.last();
    }
}
exports.qysParserContext = qysParserContext;
//# sourceMappingURL=qysParserContext.js.map