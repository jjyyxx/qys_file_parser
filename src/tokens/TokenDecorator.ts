import { RegisterPattern } from '../global'

function Token(constructor: { pattern: RegExp, new(...args: any[]): {} }) {
    RegisterPattern(constructor, constructor.pattern)
}

export { Token }
