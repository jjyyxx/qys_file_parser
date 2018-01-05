import { ParsedStaff } from './ParsedStaff'

class ParsedChord {
    public parsedStaffList: ParsedStaff[]

    constructor(left: ParsedStaff | ParsedChord, right: ParsedStaff) {
        if (left instanceof ParsedChord) {
            this.parsedStaffList = [...left.parsedStaffList, right]
        } else {
            this.parsedStaffList = [left, right]
        }
    }
}

export { ParsedChord }
