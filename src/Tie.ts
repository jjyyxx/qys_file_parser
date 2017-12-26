class Tie {
    public first: number
    public last: number
    public section: number

    constructor(firstIndex: number, lastIndex: number, section: number) {
        this.first = firstIndex
        this.last = lastIndex
        this.section = section
    }
}

export { Tie }
