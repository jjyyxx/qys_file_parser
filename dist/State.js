class State {
    constructor({ wrap = false, } = {}) {
        this.wrap = wrap;
    }
    clone() {
        const newState = new State();
        Object.assign(newState, this);
        return newState;
    }
    equals(target) {
        return true;
    }
}
export { State };
//# sourceMappingURL=State.js.map