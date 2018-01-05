import { Staff } from '../tokens/Staff'

class ParsedStaff {
    public readonly beatCount: number
    public readonly pitch: number
    public readonly isRest: boolean
    public setting: any

    constructor({beatCount, pitch, isRest}: Staff, setting: any) {
        this.beatCount = beatCount
        this.pitch = pitch
        this.isRest = isRest
        this.setting = setting
    }
}

export { ParsedStaff }
