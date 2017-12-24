"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalSettings_js_1 = require("./GlobalSettings.js");
class Section {
    constructor(setting = new GlobalSettings_js_1.GlobalSettings()) {
        this.sequence = [];
        this.setting = setting;
    }
}
exports.Section = Section;
