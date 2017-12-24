import { StaffUnit } from './StaffUnit.js'
import { Tie } from './tie.js'
import { Section } from './Section';
export { qysParserContext }

class qysParserContext {
    readonly content: String
    readonly contentLength: number
    private pointer: number
    constructor(content: String) {
        this.content = content
        this.contentLength = this.content.length
        this.pointer = 0
    }
    nextChar(incPointer = true): string {
        let ret = this.content.charAt(this.pointer)
        if (incPointer) {
            this.pointer += 1
        }
        return ret
    }
    fetchUntil(bound: string) {
        let buffer : string
        let next : string
        while ((next = this.nextChar()) !== bound) {
            buffer += next
        }
        return buffer
    }
    isEnded(): boolean {
        return this.pointer === this.contentLength
    }

    result: Array<StaffUnit> = []

    sections: Array<Section> = []

    // tie mode
    // tie: boolean = false
    ties: Array<Tie> = []

    addNewSection(){
        this.addSection(new Section())
    }

    addSection(section : Section){
        this.sections.push(section)
    }

    addNewStaff_new(pitch: number) {
        if (this.sections.length === 0) {
            this.addNewSection()
        }
        this.addStaff_new(new StaffUnit(pitch))
    }

    addStaff_new(staff: StaffUnit) {
        this.previousCommit()
        this.activeSection.empty = false
        this.activeSection.sequence.push(staff)
    }

    addNewStaff(pitch: number) {
        if (this.sections.length === 0) {
            this.addNewSection()
        }
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

    get activeStaff(): StaffUnit {
        return this.result.last()
    }

    get activeStaff_new(): StaffUnit {
        return this.activeSection.sequence.last()
    }

    get activeSection(): Section {
        return this.sections.last()
    }
}