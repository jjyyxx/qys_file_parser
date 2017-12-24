"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StaffUnit_js_1 = require("./StaffUnit.js");
const tie_js_1 = require("./tie.js");
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
        let buffer;
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
    addNewStaff_new(pitch) {
        if (this.sections.length === 0) {
            this.addNewSection();
        }
        this.addStaff_new(new StaffUnit_js_1.StaffUnit(pitch));
    }
    addStaff_new(staff) {
        this.previousCommit();
        this.activeSection.empty = false;
        this.activeSection.sequence.push(staff);
    }
    addNewStaff(pitch) {
        if (this.sections.length === 0) {
            this.addNewSection();
        }
        this.addStaff(new StaffUnit_js_1.StaffUnit(pitch));
    }
    addStaff(staff) {
        this.previousCommit();
        this.result.push(staff);
    }
    addTie() {
        let length = this.result.length;
        this.ties.push(new tie_js_1.Tie(length, length + 1));
    }
    previousCommit() {
        if (this.result.length !== 0) {
            this.activeStaff.commit();
        }
    }
    finalCommit() {
        this.previousCommit();
    }
    get activeStaff() {
        return this.result.last();
    }
    get activeStaff_new() {
        return this.activeSection.sequence.last();
    }
    get activeSection() {
        return this.sections.last();
    }
}
exports.qysParserContext = qysParserContext;
