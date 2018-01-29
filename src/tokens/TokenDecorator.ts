import { Global } from '../Global'
import { BaseToken } from './BaseToken'

// TODO: consider refactoring
function Token(constructor: { pattern: RegExp | { [key: string]: RegExp }, new(...args: any[]): BaseToken }) {
    if (constructor.pattern instanceof RegExp) {
        Global.RegisterTokenPattern(constructor, constructor.pattern)
    } else {
        // tslint:disable-next-line:forin
        for (const key in constructor.pattern) {
            Global.RegisterTokenPattern(constructor, constructor.pattern[key], key)
        }
    }
}

export { Token }
