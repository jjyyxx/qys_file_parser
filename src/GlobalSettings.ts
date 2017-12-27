class GlobalSettings {
    public static tonalityDict: { [key: string]: number } = {
        // tslint:disable-next-line:object-literal-sort-keys
        'C': 0, 'G': 7, 'D': 2, 'A': -3, 'E': 4,
        'B': -1, '#F': 6, '#C': 1, 'F': 5, 'bB': -2,
        'bE': 3, 'bA': -4, 'bD': 1, 'bG': 6, 'bC': -1,
        'F#': 6, 'C#': 1, 'Bb': -2, 'Gb': 6,
        'Eb': 3, 'Ab': -4, 'Db': 1, 'Cb': -1,
    }
    public static legalTonality = new Set(Object.keys(GlobalSettings.tonalityDict))
    public static legalSettings = new Set([
        'Key', 'Bar', 'Beat', 'Speed', 'Volume', 'Instr', 'Stac',
         'Port', 'Appo', 'Dur', 'Oct', 'FadeIn', 'FadeOut',
    ])
    public static SortedTonality: string[] = Object.keys(GlobalSettings.tonalityDict).sort((a, b) => {
        return a.length > b.length ? -1 : 1
    })

    public static isLegalSetting(key: string) {
        return GlobalSettings.legalSettings.has(key)
    }

    public static isLegalTonality(key: string) {
        return GlobalSettings.legalTonality.has(key)
    }

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

    public update(settingObj: object) {
        Object.assign(this, settingObj)
    }
}

export { GlobalSettings }
