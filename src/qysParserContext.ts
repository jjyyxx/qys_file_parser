import { StaffUnit } from './StaffUnit'
import { Tie } from './Tie'
import { Section } from './Section'
import { GlobalSettings } from './GlobalSettings'
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
        let buffer : string = ''
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

    addNewSection(setting: GlobalSettings = new GlobalSettings()){
        this.addSection(new Section(setting))
    }

    addSection(section : Section){
        this.sections.push(section)
    }

    addNewStaff(pitch: number) {
        if (this.sections.length === 0) {
            this.addNewSection()
        }
        this.addStaff(new StaffUnit(pitch))
    }

    addStaff(staff: StaffUnit) {
        this.previousCommit()
        this.activeSection.empty = false
        this.activeSection.sequence.push(staff)
    }

    addTie() {
        let sectionLength = this.sections.length
        let seqLength = this.activeSection.sequence.length
        this.ties.push(new Tie(seqLength, seqLength + 1, sectionLength))
    }

    previousCommit() {
        if (this.sections[0].sequence.length !== 0) {
            this.activeStaff.commit()
        }
    }

    finalCommit() {
        this.previousCommit()
    }

    get activeStaff(): StaffUnit {
        return this.activeSection.sequence.length === 0? this.sections.last(2).sequence.last(): this.activeSection.sequence.last()
    }

    get activeSection(): Section {
        return this.sections.last()
    }
}