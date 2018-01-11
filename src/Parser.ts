import { Appoggiatura } from './components/Appoggiatura'
import { ParsedChord } from './components/ParsedChord'
import { ParsedStaff } from './components/ParsedStaff'
import { ParsedTie } from './components/ParsedTie'
import { ParsedTuplet } from './components/ParsedTuplet'
import { PairType } from './index'
import { BaseToken } from './tokens/BaseToken'
import { Setting } from './tokens/Setting'
import { Staff } from './tokens/Staff'
import { TokenType } from './tokens/TokenType'

class Parser {
    public tokens: any[]
    // public parsed: any[]

    constructor(tokens: BaseToken[]) {
        this.tokens = tokens
    }

    public parse() {
        this.removeDup()
        const cleaned = this.clean()
        const appoggiaturaParsed = this.parseAppoggiatura(cleaned)
        const tupletParsed = this.parseTuplet(appoggiaturaParsed)
        const tieParsed = this.parseTie(tupletParsed)
        const chordParsed = this.parseChord(tieParsed)
    }

    private parseAppoggiatura(cleaned: any[]): any[] {
        let pointer = 0
        const length = cleaned.length
        const parsed = []
        while (pointer < length) {
            const element = cleaned[pointer]
            if (element.type === TokenType.AppoggiaturaBound && element.leftOrRight === PairType.Left) {
                const index = cleaned.slice(pointer + 1).findIndex((value) => value.type === TokenType.AppoggiaturaBound
                    && value.leftOrRight === PairType.Right)
                parsed.push(new Appoggiatura(cleaned.slice(pointer + 1, index)))
                pointer = index
            } else {
                parsed.push(element)
            }
            pointer += 1
        }
        return parsed
    }

    private parseTuplet(appoggiaturaParsed: any[]): any[] {
        let pointer = 0
        const length = appoggiaturaParsed.length
        const parsed = []
        while (pointer < length) {
            const element = appoggiaturaParsed[pointer]
            if (element.type === TokenType.Tuplet) {
                parsed.push(new ParsedTuplet(appoggiaturaParsed.slice(pointer + 1, pointer + 1 + element.count)))
                pointer += element.count
            } else {
                parsed.push(element)
            }
            pointer += 1
        }
        return parsed
    }

    private parseTie(tupletParsed: any[]): any[] {
        let pointer = 0
        const length = tupletParsed.length
        const parsed = []
        while (pointer < length) {
            const element = tupletParsed[pointer]
            if (element.type === TokenType.Tie) {
                pointer += 1
                const left: any = parsed.pop()
                parsed.push(new ParsedTie(left, tupletParsed[pointer]))
            } else {
                parsed.push(element)
            }
            pointer += 1
        }
        return parsed
    }

    private parseChord(tieParsed: any[]): any[] {
        let pointer = 0
        const length = tieParsed.length
        const parsed = []
        while (pointer < length) {
            const element = tieParsed[pointer]
            if (element.type === TokenType.Chord) {
                pointer += 1
                const left: any = parsed.pop()
                parsed.push(new ParsedChord(left, tieParsed[pointer]))
            } else {
                parsed.push(element)
            }
            pointer += 1
        }
        return parsed
    }

    private removeDup() {
        let pointer = 0
        const length = this.tokens.length
        let lastStaff: Staff
        while (pointer < length) {
            const element = this.tokens[pointer]
            if (element.type === TokenType.Staff) {
                const curStaff = element as Staff
                if (curStaff.isDuplicate) {
                    curStaff.alterDup(lastStaff.pitch, lastStaff.beatCount)
                } else {
                    lastStaff = curStaff
                }
            }
            pointer += 1
        }
    }

    private clean(): any[] {
        let pointer = 0
        const cleaned = []
        const length = this.tokens.length
        let settingContext = {}
        while (pointer < length) {
            const element = this.tokens[pointer]
            if (element.type === TokenType.Staff) {
                const curStaff = element as Staff
                cleaned.push(new ParsedStaff(curStaff, settingContext))
            } else if (element.type === TokenType.Setting) {
                const curSetting = element as Setting
                const newSetting = {}
                Object.assign(newSetting, settingContext, Object.reverseFrom(curSetting.settings))
                settingContext = newSetting
            } else if (element.type !== TokenType.Comment && element.type !== TokenType.MeasureBound) {
                cleaned.push(element)
            }
            pointer += 1
        }
        return cleaned
    }
}

export { Parser }
