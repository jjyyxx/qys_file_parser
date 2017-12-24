interface Array<T> {
    last(): T
}

Array.prototype.last = function () {
    return this.slice(-1).pop()
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