import { IState } from './LineTokenizer'

class State implements IState {
    public wrap: boolean

    constructor({
        wrap = false,
    } = {}) {
        this.wrap = wrap
    }

    public clone() {
        const newState = new State()
        Object.assign(newState, this)
        return newState
    }

    public equals(target: IState): boolean {
        return true
    }
}

export { State }
