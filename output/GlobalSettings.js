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
}
exports.GlobalSettings = GlobalSettings;
