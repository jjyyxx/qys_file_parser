"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlobalSettings {
    constructor({ Key = 0, Bar = 4, Beat = 4, Speed = 90, Volume = 1.0, Instr = 'Piano', Stac = 1 / 2, Port = 6, Appo = 1 / 4, Dur = 0, Oct = 0, FadeIn = 2, FadeOut = 2 } = {}) {
        this.Key = Key;
        this.Bar = Bar;
        this.Beat = Beat;
        this.Speed = Speed;
        this.Volume = Volume;
        this.Instr = Instr;
        this.Stac = Stac;
        this.Port = Port;
        this.Appo = Appo;
        this.Dur = Dur;
        this.Oct = Oct;
        this.FadeIn = FadeIn;
        this.FadeOut = FadeOut;
    }
    extend(settingObj) {
        let newSetting = new GlobalSettings();
        return Object.assign(newSetting, this, settingObj);
    }
    update(settingObj) {
        Object.assign(this, settingObj);
    }
    static isLegalSetting(key) {
        return GlobalSettings.legalSettings.has(key);
    }
    static isLegalTonality(key) {
        return GlobalSettings.legalTonality.has(key);
    }
}
GlobalSettings.tonalityDict = {
    "C": 0, "G": 7, "D": 2, "A": -3, "E": 4,
    "B": -1, "#F": 6, "#C": 1, "F": 5, "bB": -2,
    "bE": 3, "bA": -4, "bD": 1, "bG": 6, "bC": -1,
    "F#": 6, "C#": 1, "Bb": -2, "Gb": 6,
    "Eb": 3, "Ab": -4, "Db": 1, "Cb": -1
};
GlobalSettings.legalTonality = new Set(Object.keys(GlobalSettings.tonalityDict));
GlobalSettings.legalSettings = new Set(["Key", "Bar", "Beat", "Speed", "Volume", "Instr", "Stac", "Port", "Appo", "Dur", "Oct", "FadeIn", "FadeOut"]);
GlobalSettings.SortedTonality = Object.keys(GlobalSettings.tonalityDict).sort((a, b) => {
    return a.length > b.length ? -1 : 1;
});
exports.GlobalSettings = GlobalSettings;
