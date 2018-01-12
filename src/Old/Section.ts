import { GlobalSettings } from '../GlobalSettings'
import { StaffUnit } from './StaffUnit'

export { Section }

class Section {
    public empty: boolean
    public setting: GlobalSettings
    public sequence: StaffUnit[] = []

    constructor(setting: GlobalSettings = new GlobalSettings()) {
        this.setting = setting
        this.empty = true
    }
}
