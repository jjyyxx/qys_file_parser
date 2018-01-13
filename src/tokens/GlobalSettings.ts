import { Tokenizer } from '../Tokenizer'
import { Setting } from './Setting'

class GlobalSettings {
    public Key: number
    public Bar: number
    public Beat: number
    public Speed: number
    public Volume: number
    public Instr: string
    public Stac: number
    public Port: number
    public Appo: number
    public Dur: number
    public Oct: number
    public FadeIn: number
    public FadeOut: number

    constructor(matched: string = '') {
        const result: Setting[] = Tokenizer.tokenize(matched)
        const obj = Object.reverseFrom(result.reduce((pre, cur) => (pre.settings.push(...cur.settings), pre)).settings)
        this.assign(obj)
    }

    public assign({
        Key = 0,
        Bar = 4,
        Beat = 4,
        Speed = 90,
        Volume = 1.0,
        Instr = 'Piano',
        Stac = 1 / 2,
        Port = 6,
        Appo = 1 / 4,
        Dur = 0,
        Oct = 0,
        FadeIn = 2,
        FadeOut = 2,
    } = {}) {
        this.Key = Key
        this.Bar = Bar
        this.Beat = Beat
        this.Speed = Speed
        this.Volume = Volume
        this.Instr = Instr
        this.Stac = Stac
        this.Port = Port
        this.Appo = Appo
        this.Dur = Dur
        this.Oct = Oct
        this.FadeIn = FadeIn
        this.FadeOut = FadeOut
    }

    public extend(settingObj: object): GlobalSettings {
        const newSetting = new GlobalSettings()
        return Object.assign(newSetting, this, settingObj)
    }
}

export { GlobalSettings }
