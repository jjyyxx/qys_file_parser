import { ParsedStaff } from './ParsedStaff'

class ParsedTuplet {
    public parsedStaffList: ParsedStaff[]

    constructor(parsedStaffList: ParsedStaff[]) {
        this.parsedStaffList = parsedStaffList
    }
}

export { ParsedTuplet }
