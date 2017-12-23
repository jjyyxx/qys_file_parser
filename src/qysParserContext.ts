import { staffUnit } from './staffUnit.js'
export { qysParserContext }

let tonalityDict = {
    "C": 0, "G": 7, "D": 2, "A": -3, "E": 4,
    "B": -1, "#F": 6, "#C": 1, "F": 5, "bB": -2,
    "bE": 3, "bA": -4, "bD": 1, "bG": 6, "bC": -1,
    "F#": 6, "C#": 1, "Bb": -2, "Gb": 6,
    "Eb": 3, "Ab": -4, "Db": 1, "Cb": -1
};

class qysParserContext {
    globalSetting: Object = {
        tonality: 'C'
    }

    result: Array<staffUnit> = []

    tie: boolean = false

    constructor() {

    }

    addNewStaff(pitch: number) {
        this.addStaff(new staffUnit(pitch))
    }

    addStaff(staff: staffUnit){
        if (this.tie) {
            let tempStaff = this.result.pop()
            this.activeStaff.merge(tempStaff)
            this.tie = false
        }
        this.previousCommit()
        this.result.push(staff)
    }

    previousCommit () {
        if (this.result.length !== 0) {
            this.activeStaff.commit()
        }
    }

    public get activeStaff(): staffUnit {
        return this.result.slice(-1).pop()
    }
}