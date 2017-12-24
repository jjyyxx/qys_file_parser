"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StaffUnit_js_1 = require("./StaffUnit.js");
const tie_js_1 = require("./tie.js");
let tonalityDict = {
    "C": 0, "G": 7, "D": 2, "A": -3, "E": 4,
    "B": -1, "#F": 6, "#C": 1, "F": 5, "bB": -2,
    "bE": 3, "bA": -4, "bD": 1, "bG": 6, "bC": -1,
    "F#": 6, "C#": 1, "Bb": -2, "Gb": 6,
    "Eb": 3, "Ab": -4, "Db": 1, "Cb": -1
};
class qysParserContext {
    constructor(content) {
        this.globalSetting = {
            tonality: 'C'
        };
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
    isEnded() {
        return this.pointer === this.contentLength;
    }
    addNewStaff(pitch) {
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
        return this.result.slice(-1).pop();
    }
}
exports.qysParserContext = qysParserContext;
