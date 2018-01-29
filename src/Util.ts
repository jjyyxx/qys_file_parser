interface Array<T> {
    last(index?: number): T
    split(func: (bound: T) => boolean, keep?: boolean): T[][]
}

Array.prototype.last = function (index = 1) {
    return this[this.length - index]
}

Array.prototype.split = function (this: any[], func: (bound: any) => boolean, keep = false) {
    const splitted: any[][] = []
    let prev = -1
    this.forEach((x, index) => {
        if (func(x)) {
            splitted.push(this.slice(keep ? prev : prev + 1, index))
            prev = index
        }
    })
    splitted.push(this.slice(keep ? prev : prev + 1))
    return splitted
}

interface Fraction {
    Numerator: number
    Denominator: number
}

interface String {
    calcOct(): number
    toNumIfPossible(): (number | string)
    toFraction(): Fraction
    isNumeric(): boolean
}

String.prototype.calcOct = function () {
    let legal = true
    let result = 0
    for (let i = 0, len = this.length; i < len && legal; i++) {
        const element = this.charAt(i)
        if (element === ',') {
            result -= 1
        } else {
            if (element === '\'') {
                result += 1
            } else {
                legal = false
            }
        }
    }
    if (legal) {
        return result
    } else {
        return NaN
    }
}

String.prototype.toFraction = function () {
    const possibleFraction: string[] = this.split('/')
    if (possibleFraction.length === 2) {
        const processedNum = possibleFraction
            .map((possibleNum) => Number(possibleNum))
            .filter((possibleNum) => possibleNum)
        if (processedNum.length === 2) {
            return { Numerator: processedNum[0], Denominator: processedNum[1] }
        }
    }
    return undefined
}

String.prototype.toNumIfPossible = function () {
    const possibleNum = Number(this)
    if (Number.isNaN(possibleNum)) {
        const possibleFraction: Fraction = this.toFraction()
        if (possibleFraction) {
            return possibleFraction.Numerator / possibleFraction.Denominator
        }
        return this.valueOf()
    } else {
        return possibleNum
    }
}

String.prototype.isNumeric = function () {
    return !isNaN(this - parseFloat(this))
}

interface ObjectConstructor {
    reverseFrom(KVArray: Array<{ key: string, value: any }>): object
    getKeyByValue(object: object, value: any): any
}

Object.reverseFrom = (KVArray: Array<{ key: string, value: any }>): object => {
    const obj: { [key: string]: any } = {}
    KVArray.forEach((KVPair) => {
        obj[KVPair.key] = KVPair.value
    })
    return obj
}

Object.getKeyByValue = (object: any, value: any): any => {
    return Object.keys(object).find((key) => object[key] === value)
}
