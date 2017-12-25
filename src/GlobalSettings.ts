class GlobalSettings {
    static tonalityDict = {
        "C": 0, "G": 7, "D": 2, "A": -3, "E": 4,
        "B": -1, "#F": 6, "#C": 1, "F": 5, "bB": -2,
        "bE": 3, "bA": -4, "bD": 1, "bG": 6, "bC": -1,
        "F#": 6, "C#": 1, "Bb": -2, "Gb": 6,
        "Eb": 3, "Ab": -4, "Db": 1, "Cb": -1
    };
    static legalTonality = new Set(Object.keys(GlobalSettings.tonalityDict))
    static legalSettings = new Set(["Key", "Bar", "Beat", "Speed", "Volume", "Instr", "Stac", "Port", "Appo", "Dur", "Oct", "FadeIn", "FadeOut"])
    static SortedTonality = Object.keys(GlobalSettings.tonalityDict).sort((a, b) => {
        return a.length > b.length ? -1 : 1
    })
    Key: number
    Bar: number
    Beat: number
    Speed: number
    Volume: number
    Instr: String
    Stac: number
    Port: number
    Appo: number
    Dur: number
    Oct: number
    FadeIn: number
    FadeOut: number

    constructor({
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
        FadeOut = 2
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

    extend(settingObj: object): GlobalSettings {
        let newSetting = new GlobalSettings()
        return Object.assign(newSetting, this, settingObj)
    }

    update(settingObj: object){
        Object.assign(this, settingObj)
    }

    static isLegalSetting(key: string) {
        return GlobalSettings.legalSettings.has(key)
    }

    static isLegalTonality(key: string) {
        return GlobalSettings.legalTonality.has(key)
    }
}

export { GlobalSettings }