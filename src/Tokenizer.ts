import { AppoggiaturaBound } from './tokens/AppoggiaturaBound'
import { BaseToken } from './tokens/BaseToken'
import { Chord } from './tokens/Chord'
import { Comment } from './tokens/Comment'
import { DotAfter } from './tokens/DotAfter'
import { MeasureBound } from './tokens/MeasureBound'
import { RepeatBound } from './tokens/RepeatBound'
import { RepeatSkip } from './tokens/RepeatSkip'
import { Setting } from './tokens/Setting'
import { Staff } from './tokens/Staff.js'
import { Suffix } from './tokens/Suffix'
import { Terminal } from './tokens/Terminal'
import { Tie } from './tokens/Tie'
import { PairType, SuffixType, TokenType } from './tokens/TokenType'
import { Tuplet } from './tokens/Tuplet'
import { UnrecognizedToken } from './tokens/UnrecognizedToken'

class Tokenizer {
    private content: string
    private pointer: number
    private length: number
    private result: BaseToken[]
    private lastStaff: Staff

    constructor(content: string) {
        this.content = content
        this.pointer = 0
        this.length = this.content.length
        this.result = []
        this.lastStaff = undefined
    }

    public tokenize(): BaseToken[] {
        while (!this.isEnded()) {
            const nextChar = this.nextChar()
            const token = this.dispatch(nextChar)
            if (token) {
                if (token.type === TokenType.Staff) {
                    this.lastStaff = token as Staff
                    this.result.push(token)
                } else if (this.lastStaff && token.type === TokenType.Suffix) {
                    this.lastStaff.appendSuffix(token as Suffix)
                } else {
                    this.result.push(token)
                }
            }
        }
        return this.result
    }

    private dispatch(char: string): BaseToken {
        // Staff
        if (char.isNumeric()) {
            const pitch = Number(char)
            if (pitch === 0) {
                return new Staff({ isRest: true })
            } else if (pitch >= 1 && pitch <= 7) {
                return new Staff({ pitch })
            } else {
                return new UnrecognizedToken(char)
            }
        }

        if (char === '%') {
            return new Staff({
                isDuplicate: true,
            })
        }

        // Suffix
        if (Suffix.Suffix.has(char)) {
            return char === '.' ? new DotAfter() : new Suffix(Suffix.SuffixDict[char])
        }

        // Tie/Slur/Appoggiatura Right
        if (char === '^') {
            const next = this.nextChar(false)
            if (next !== ')') {
                return new Tie()
            } else {
                this.incPointer()
                return new AppoggiaturaBound(PairType.Right)
            }
        }

        // Chord
        if (char === '&') {
            return new Chord()
        }

        // Tuplet/Appoggiatura Ledt
        if (char === '(') {
            const tup = this.fetchUntil(')')
            if (tup) {
                if (tup.endsWith('^')) {    // Appoggiatura
                    this.incPointer(-tup.length - 1) // reset
                    return new AppoggiaturaBound(PairType.Left)
                } else {                    // Tuplet
                    if (tup.isNumeric()) {
                        return new Tuplet(Number(tup))
                    } else {
                        return new UnrecognizedToken(`(${tup})`)
                    }
                }
            } else {
                if (tup === '') {
                    return new UnrecognizedToken('()')
                }
                return new UnrecognizedToken('(')
            }
        }

        // Measure
        if (char === '|') {
            const next1 = this.nextChar(false)
            if (next1 !== '|') {
                return new MeasureBound()
            } else {
                this.incPointer()
                const next2 = this.nextChar(false)
                if (next2 !== ':') {
                    return new Terminal()
                } else {
                    this.incPointer()
                    return new RepeatBound(PairType.Left)
                }
            }
        }

        if (char === ':') {
            const next1 = this.nextChar(false)
            if (next1 !== '|') {
                return new UnrecognizedToken(':')
            } else {
                this.incPointer()
                const next2 = this.nextChar(false)
                if (next2 !== '|') {
                    return new UnrecognizedToken(':|')
                } else {
                    this.incPointer()
                    return new RepeatBound(PairType.Right)
                }
            }
        }

        // RepeatSkip
        if (char === '[') {
            const skip = this.fetchUntil(']')
            if (skip) {
                let parts = skip.split('.')
                if (parts.length >= 2 && parts.last() === '') {
                    parts = parts.slice(0, -1)
                    if (parts.every((value) => value.isNumeric())) {
                        const numParts = parts.map((value) => Number(value))
                        return new RepeatSkip(numParts)
                    }
                } else {
                    return new UnrecognizedToken(`[${skip}]`)
                }
            } else {
                if (skip === '') {
                    return new UnrecognizedToken('[]')
                }
                return new UnrecognizedToken('[')
            }
        }

        // Setting
        if (char === '<') {
            const setting = this.fetchUntil('>')
            if (setting) {
                let settingToken: Setting
                try {
                    settingToken = new Setting(setting)
                } catch (error) {
                    return new UnrecognizedToken(`<${setting}>`)
                }
                return settingToken
            } else {
                if (setting === '') {
                    return new UnrecognizedToken('<>')  // TODO: improve pattern
                }
                return new UnrecognizedToken('<')
            }
        }

        // Comment
        if (char === '/') {
            const next = this.nextChar(false)
            if (next !== '/') {
                return new UnrecognizedToken('/')
            }
            this.incPointer()
            return new Comment(this.fetchUntil('\n', true))
        }

        if (char === '\n' || char === ' ') {    // FIXME: need more info about \n
            return undefined
        }

        return new UnrecognizedToken(char)
    }

    private nextChar(incPointer = true): string {
        if (this.isEnded()) {
            return undefined
        }
        const ret = this.content.charAt(this.pointer)
        if (incPointer) {
            this.pointer += 1
        }
        return ret
    }

    private incPointer(offset = 1) {
        this.pointer += offset
    }

    private isEnded(): boolean {
        return this.pointer >= this.length
    }

    private fetchUntil(bound: string, toLastIfNotFound = false) {
        let boundIndex = this.content.indexOf(bound, this.pointer)
        if (boundIndex === -1) {
            if (toLastIfNotFound) {
                boundIndex = this.content.length
            } else {
                return undefined
            }
        }
        const res = this.content.slice(this.pointer, boundIndex)
        this.pointer = boundIndex + 1
        return res
    }
}

export { Tokenizer }
