Array.prototype.last = function (index = 1) {
    return this[this.length - index];
};
String.prototype.calcOct = function () {
    let legal = true;
    let result = 0;
    for (let i = 0, len = this.length; i < len && legal; i++) {
        let element = this.charAt(i);
        if (element === ',') {
            result -= 1;
        }
        else {
            if (element === "'") {
                result += 1;
            }
            else {
                legal = false;
            }
        }
    }
    if (legal) {
        return result;
    }
    else {
        return NaN;
    }
};
String.prototype.toFraction = function () {
    let possibleFraction = this.split("/");
    if (possibleFraction.length === 2) {
        let processedNum = possibleFraction.map(possibleNum => Number(possibleNum)).filter(possibleNum => possibleNum);
        if (processedNum.length === 2) {
            return { Numerator: processedNum[0], Denominator: processedNum[1] };
        }
    }
    return undefined;
};
String.prototype.toNumIfPossible = function () {
    let possibleNum = Number(this);
    if (Number.isNaN(possibleNum)) {
        let possibleFraction = this.toFraction();
        if (possibleFraction) {
            return possibleFraction.Numerator / possibleFraction.Denominator;
        }
        return this.valueOf();
    }
    else {
        return possibleNum;
    }
};
Object.reverseFrom = function (KVArray) {
    let obj = {};
    KVArray.forEach(KVPair => {
        obj[KVPair.key] = KVPair.value;
    });
    return obj;
};
//# sourceMappingURL=Util.js.map