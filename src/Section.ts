import { GlobalSettings } from "./GlobalSettings.js";
import { StaffUnit } from "./StaffUnit";

export { Section }

class Section {
    setting : GlobalSettings
    sequence : Array <StaffUnit> = []

    constructor(setting : GlobalSettings = new GlobalSettings()) {
        this.setting = setting
    }
}