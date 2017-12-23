"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const staffUnit_js_1 = require("./staffUnit.js");
let tonalityDict = {
    "C": 0, "G": 7, "D": 2, "A": -3, "E": 4,
    "B": -1, "#F": 6, "#C": 1, "F": 5, "bB": -2,
    "bE": 3, "bA": -4, "bD": 1, "bG": 6, "bC": -1,
    "F#": 6, "C#": 1, "Bb": -2, "Gb": 6,
    "Eb": 3, "Ab": -4, "Db": 1, "Cb": -1
};
class qysParserContext {
    constructor() {
        this.globalSetting = {
            tonality: 'C'
        };
        this.result = [];
        this.tie = false;
    }
    addNewStaff(pitch) {
        this.addStaff(new staffUnit_js_1.staffUnit(pitch));
    }
    addStaff(staff) {
        if (this.tie) {
            let tempStaff = this.result.pop();
            this.activeStaff.merge(tempStaff);
            this.tie = false;
        }
        this.previousCommit();
        this.result.push(staff);
    }
    previousCommit() {
        if (this.result.length !== 0) {
            this.activeStaff.commit();
        }
    }
    get activeStaff() {
        return this.result.slice(-1).pop();
    }
}
exports.qysParserContext = qysParserContext;
