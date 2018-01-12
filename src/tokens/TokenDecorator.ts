import { Global } from '../Global'
import { BaseToken } from './BaseToken'

function Token(constructor: { pattern: RegExp, new(...args: any[]): BaseToken }) {
    Global.RegisterPattern(constructor, constructor.pattern)
}

export { Token }
