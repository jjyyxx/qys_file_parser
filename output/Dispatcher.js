"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dispatcher {
    constructor(context) {
        this.context = context;
    }
    pitch(pitch) {
        this.context.addNewStaff(pitch);
    }
    '#'() {
        this.context.activeStaff.pitch += 1;
    }
    'b'() {
        this.context.activeStaff.pitch -= 1;
    }
    "'"() {
        this.context.activeStaff.pitch += 12;
    }
    ','() {
        this.context.activeStaff.pitch -= 12;
    }
    '%'() {
        let tempStaff = new StaffUnit_js_1.StaffUnit(0);
        Object.assign(tempStaff, this.context.activeStaff);
        this.context.addStaff(tempStaff);
    }
    '-'() {
        this.context.activeStaff.beatCount += 1;
    }
    '_'() {
        this.context.activeStaff.beatCount /= 2;
    }
    '.'() {
        this.context.activeStaff.dotCount += 1;
    }
    '|'() {
    }
    '^'() {
        this.context.addTie();
        // TODO: deal with illegal input
    }
}
exports.Dispatcher = Dispatcher;
const StaffUnit_js_1 = require("./StaffUnit.js");
