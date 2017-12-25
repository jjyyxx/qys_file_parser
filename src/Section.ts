import { GlobalSettings } from "./GlobalSettings";
import { StaffUnit } from "./StaffUnit";

export { Section }

class Section {
    empty : boolean
    setting : GlobalSettings
    sequence : Array <StaffUnit> = []

    constructor(setting : GlobalSettings = new GlobalSettings()) {
        this.setting = setting
        this.empty = true
    }
}