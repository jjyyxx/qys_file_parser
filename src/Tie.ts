class Tie {
    first: number
    last: number
    section: number

    constructor(first_index: number, last_index: number, section: number) {
        this.first = first_index
        this.last = last_index
        this.section = section
    }
}

export { Tie }