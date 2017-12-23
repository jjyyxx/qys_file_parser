"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class dispatcher {
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
        this.context.addStaff(this.context.activeStaff);
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
        this.context.tie = true;
    }
}
exports.dispatcher = dispatcher;
