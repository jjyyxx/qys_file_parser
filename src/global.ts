function RegisterPattern(constuctor: { new(...args: any[]): {} }, pattern: RegExp) {
    Patterns.push({
        constuctor,
        pattern,
    })
}

const Patterns: Array<{ constuctor: { new(...args: any[]): {} }, pattern: RegExp }> = []

export { Patterns, RegisterPattern }
