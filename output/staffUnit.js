export { staffUnit };
let pitchDict = { "1": 0, "2": 2, "3": 4, "4": 5, "5": 7, "6": 9, "7": 11 };
class staffUnit {
    constructor(oriPitch, beatCount = 1) {
        this.dotCount = 0;
        this.oriPitch = oriPitch;
        this.pitch = pitchDict[oriPitch];
        this.beatCount = beatCount;
    }
    get beatCount() {
        return this._beatCount * this.dotToTimes();
    }
    set beatCount(v) {
        this.dotCount = 0;
        this._beatCount = v;
    }
    dotToTimes() {
        return 2 - Math.pow(2, -this.dotCount);
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
}
