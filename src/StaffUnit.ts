export { StaffUnit }

class StaffUnit {
    public static pitchDict: { [key: number]: number } = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 }
    public readonly oriPitch: number
    public pitch: number
    public dotCount: number = 0
    // tslint:disable-next-line:variable-name
    private _beatCount: number
    public get beatCount(): number {
        return this._beatCount * this.dotToTimes()
    }
    public set beatCount(v: number) {
        this.dotCount = 0
        this._beatCount = v
    }

    constructor(oriPitch: number, beatCount = 1) {
        this.oriPitch = oriPitch
        this.pitch = StaffUnit.pitchDict[oriPitch]
        this.beatCount = beatCount
    }

    public commit() {
        this._beatCount = this.beatCount
        this.dotCount = 0
    }

    public merge(staff: StaffUnit) {
        this.commit()
        staff.commit()
        this._beatCount += staff.beatCount
    }

    private dotToTimes(): number {
        return 2 - Math.pow(2, -this.dotCount)
    }
}
