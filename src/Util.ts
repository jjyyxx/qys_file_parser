interface Array<T> {
    last(index?: number): T
}

Array.prototype.last = function (index = 1) {
    return this[this.length - index]
}

interface String {
    calcOct(): number
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