import { StaffUnit } from './StaffUnit.js'
import { Tie } from './tie.js'
import { Section } from './Section';
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

    readonly content: String
    readonly contentLength: number
    private pointer: number

    constructor(content: String) {
        this.content = content
        this.contentLength = this.content.length
        this.pointer = 0
    }

    nextChar(incPointer = true) : string{
        let ret = this.content.charAt(this.pointer)
        if (incPointer){
            this.pointer += 1
        }
        return ret
    }

    isEnded(): boolean {
        return this.pointer === this.contentLength
    }

    result: Array<StaffUnit> = []

    sections: Array<Section> = []

    // tie mode
    // tie: boolean = false
    ties: Array<Tie> = []

    addNewStaff(pitch: number) {
        this.addStaff(new StaffUnit(pitch))
    }

    addStaff(staff: StaffUnit) {
        this.previousCommit()
        this.result.push(staff)
    }

    addTie() {
        let length = this.result.length
        this.ties.push(new Tie(length, length + 1))
    }

    previousCommit() {
        if (this.result.length !== 0) {
            this.activeStaff.commit()
        }
    }

    finalCommit() {
        this.previousCommit()
    }

    public get activeStaff(): StaffUnit {
        return this.result.slice(-1).pop()
    }
}