class Dispatcher {
    context : qysParserContext
    constructor (context) {
        this.context = context
    }

    pitch(pitch: number) {
        this.context.addNewStaff(pitch)
    }

    '#' () {
        this.context.activeStaff.pitch += 1
    }

    'b' () {
        this.context.activeStaff.pitch -= 1
    }

    "'" () {
        this.context.activeStaff.pitch += 12
    }

    ',' () {
        this.context.activeStaff.pitch -= 12
    }

    '%' () {
        let tempStaff : StaffUnit = new StaffUnit(0);
        Object.assign(tempStaff, this.context.activeStaff)
        this.context.addStaff(tempStaff)
    }

    '-' () {
        this.context.activeStaff.beatCount += 1
    }

    '_' () {
        this.context.activeStaff.beatCount /= 2
    }

    '.' () {
        this.context.activeStaff.dotCount += 1
    }

    '|' () {
        
    }

    '^' () {
        this.context.addTie()
        // TODO: deal with illegal input
    }
}

import { qysParserContext } from "./qysParserContext.js";
import { StaffUnit } from "./StaffUnit.js";
export { Dispatcher }