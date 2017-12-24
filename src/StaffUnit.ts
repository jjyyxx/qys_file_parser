export { StaffUnit }

let pitchDict = { "1": 0, "2": 2, "3": 4, "4": 5, "5": 7, "6": 9, "7": 11 };

class StaffUnit {
    readonly oriPitch: number
    pitch: number
    
    private _beatCount : number;
    public get beatCount() : number {
        return this._beatCount * this.dotToTimes();
    }
    public set beatCount(v : number) {
        this.dotCount = 0
        this._beatCount = v;
    }
    
    dotCount: number = 0

    dotToTimes () : number {
        return 2 - Math.pow(2, -this.dotCount)
    }

    constructor(oriPitch: number, beatCount = 1) {
        this.oriPitch = oriPitch
        this.pitch = pitchDict[oriPitch]
        this.beatCount = beatCount
    }

    commit () {
        this._beatCount = this.beatCount
        this.dotCount = 0
    }

    merge (staff: StaffUnit){
        this.commit()
        staff.commit()
        this._beatCount += staff.beatCount
    }
}

