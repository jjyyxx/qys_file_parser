import { GlobalSettings } from '../GlobalSettings'
import { Section } from './Section'
import { StaffUnit } from './StaffUnit'
import { Tie } from './Tie'
export { qysParserContext }

// tslint:disable-next-line:class-name
class qysParserContext {
    public readonly content: string
    public readonly contentLength: number
    public sections: Section[] = []
    // tie mode
    // tie: boolean = false
    public ties: Tie[] = []

    private pointer: number
    constructor(content: string) {
        this.content = content
        this.contentLength = this.content.length
        this.pointer = 0
    }
    public nextChar(incPointer = true): string {
        if (this.pointer >= this.content.length) {
            return undefined
        }
        const ret = this.content.charAt(this.pointer)
        if (incPointer) {
            this.pointer += 1
        }
        return ret
    }
    public fetchUntil(bound: string) {       // TODO: improve performance
        let buffer: string = ''
        let next: string
        // tslint:disable-next-line:no-conditional-assignment
        while ((((next = this.nextChar()) !== bound)) && (next !== undefined)) {
            buffer += next
        }
        return buffer
    }
    public fetchLine() {
        this.fetchUntil('\n')
    }
    public isEnded(): boolean {
        return this.pointer === this.contentLength
    }

    public addNewSection(setting: GlobalSettings = new GlobalSettings()) {
        this.addSection(new Section(setting))
    }

    public addSection(section: Section) {
        this.sections.push(section)
    }

    public addNewStaff(pitch: number) {
        if (this.sections.length === 0) {
            this.addNewSection()
        }
        this.addStaff(new StaffUnit(pitch))
    }

    public addStaff(staff: StaffUnit) {
        this.previousCommit()
        this.activeSection.empty = false
        this.activeSection.sequence.push(staff)
    }

    public addTie() {
        const sectionLength = this.sections.length
        const seqLength = this.activeSection.sequence.length
        this.ties.push(new Tie(seqLength, seqLength + 1, sectionLength))
    }

    public previousCommit() {
        if (this.sections[0] && this.sections[0].sequence.length !== 0) {
            this.activeStaff.commit()
        }
    }

    public finalCommit() {
        this.previousCommit()
    }

    get activeStaff(): StaffUnit {
        return this.activeSection.sequence.length === 0
            ? this.sections.last(2).sequence.last()
            : this.activeSection.sequence.last()
    }

    get activeSection(): Section {
        return this.sections.last()
    }
}
