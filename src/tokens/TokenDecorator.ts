import { Global } from '../Global'
import { BaseStructure, BaseToken } from './BaseToken'

// TODO: consider refactoring
function Token(constructor: { pattern: RegExp, new(...args: any[]): BaseToken }) {
    Global.RegisterTokenPattern(constructor, constructor.pattern)
}

function Structure(constructor: { pattern: RegExp, new(...args: any[]): BaseStructure }) {
    Global.RegisterStructurePattern(constructor, constructor.pattern)
}

export { Token, Structure }
