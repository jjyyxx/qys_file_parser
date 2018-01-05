import { ParsedStaff } from './ParsedStaff'

class Appoggiatura {
    public parsedStaffList: ParsedStaff[]

    constructor(parsedStaffList: ParsedStaff[]) {
        this.parsedStaffList = parsedStaffList
    }
}

export { Appoggiatura }
