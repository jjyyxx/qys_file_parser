"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StaffUnit {
    constructor(oriPitch, beatCount = 1) {
        this.dotCount = 0;
        this.isMute = false;
        this.oriPitch = oriPitch;
        if (oriPitch === 0) {
            this.isMute = true;
        }
        else {
            this.pitch = StaffUnit.pitchDict[oriPitch];
        }
        this.beatCount = beatCount;
    }
    get beatCount() {
        return this._beatCount * this.dotToTimes();
    }
    set beatCount(v) {
        this.dotCount = 0;
        this._beatCount = v;
    }
    commit() {
        this._beatCount = this.beatCount;
        this.dotCount = 0;
    }
    merge(staff) {
        this.commit();
        staff.commit();
        this._beatCount += staff.beatCount;
    }
    dotToTimes() {
        return 2 - Math.pow(2, -this.dotCount);
    }
}
StaffUnit.pitchDict = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
exports.StaffUnit = StaffUnit;
//# sourceMappingURL=StaffUnit.js.map