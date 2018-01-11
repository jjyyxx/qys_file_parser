"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalSettings_1 = require("../GlobalSettings");
class Section {
    constructor(setting = new GlobalSettings_1.GlobalSettings()) {
        this.sequence = [];
        this.setting = setting;
        this.empty = true;
    }
}
exports.Section = Section;
//# sourceMappingURL=Section.js.map