interface Array<T> {
    last(index?: number): T
}

Array.prototype.last = function (index = 1) {
    return this[this.length - index]
}

interface Fraction {
    Numerator: number
    Denominator: number
}

interface String {
    calcOct(): number
    toNumIfPossible(): (number | string)
    toFraction(): Fraction
}

String.prototype.calcOct = function () {
    let legal = true
    let result = 0
    for (let i = 0, len = this.length; i < len && legal; i++) {
        let element = this.charAt(i)
        if (element === ',') {
            result -= 1
        } else {
            if (element === "'") {
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
    let possibleFraction: Array<String> = this.split("/")
    if (possibleFraction.length === 2) {
        let processedNum = possibleFraction.map(possibleNum => Number(possibleNum)).filter(possibleNum => possibleNum)
        if (processedNum.length === 2) {
            return { Numerator: processedNum[0], Denominator: processedNum[1] }
        }
    }
    return undefined
}

String.prototype.toNumIfPossible = function () {
    let possibleNum = Number(this)
    if (Number.isNaN(possibleNum)) {
        let possibleFraction: Fraction = this.toFraction()
        if (possibleFraction) {
            return possibleFraction.Numerator / possibleFraction.Denominator
        }
        return this.valueOf()
    } else {
        return possibleNum
    }
}



interface ObjectConstructor {
    reverseFrom(KVArray: Array<{ key: string, value: any }>): object
}

Object.reverseFrom = function (KVArray: Array<{ key: string, value: any }>): object {
    let obj: { [key: string]: any } = {}
    KVArray.forEach(KVPair => {
        obj[KVPair.key] = KVPair.value
    })
    return obj
}