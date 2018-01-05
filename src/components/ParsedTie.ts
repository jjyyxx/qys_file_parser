import { ParsedStaff } from './ParsedStaff'

class ParsedTie {
    public parsedStaffList: ParsedStaff[]

    constructor(left: ParsedStaff | ParsedTie, right: ParsedStaff) {
        if (left instanceof ParsedTie) {
            this.parsedStaffList = [...left.parsedStaffList, right]
        } else {
            this.parsedStaffList = [left, right]
        }
    }
}

export { ParsedTie }
