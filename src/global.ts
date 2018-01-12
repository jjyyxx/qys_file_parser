import { BaseToken } from './tokens/BaseToken'
import { TokenType } from './tokens/TokenType'
import { UnrecognizedToken } from './tokens/UnrecognizedToken'

class Global {
    public static Patterns: Array<{ constuctor: { new(...args: any[]): BaseToken }, pattern: RegExp }> = []
    public static FallbackToken = UnrecognizedToken
    public static RegisterPattern(constuctor: { new(...args: any[]): BaseToken }, pattern: RegExp) {
        Global.Patterns.push({
            constuctor,
            pattern,
        })
    }
}

export { Global }
