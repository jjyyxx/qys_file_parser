Array.prototype.last = function (index = 1) {
    return this[this.length - index];
};
String.prototype.calcOct = function () {
    let legal = true;
    let result = 0;
    for (let i = 0, len = this.length; i < len && legal; i++) {
        const element = this.charAt(i);
        if (element === ',') {
            result -= 1;
        }
        else {
            if (element === '\'') {
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
    const possibleFraction = this.split('/');
    if (possibleFraction.length === 2) {
        const processedNum = possibleFraction
            .map((possibleNum) => Number(possibleNum))
            .filter((possibleNum) => possibleNum);
        if (processedNum.length === 2) {
            return { Numerator: processedNum[0], Denominator: processedNum[1] };
        }
    }
    return undefined;
};
String.prototype.toNumIfPossible = function () {
    const possibleNum = Number(this);
    if (Number.isNaN(possibleNum)) {
        const possibleFraction = this.toFraction();
        if (possibleFraction) {
            return possibleFraction.Numerator / possibleFraction.Denominator;
        }
        return this.valueOf();
    }
    else {
        return possibleNum;
    }
};
String.prototype.isNumeric = function () {
    return !isNaN(this - parseFloat(this));
};
Object.reverseFrom = (KVArray) => {
    const obj = {};
    KVArray.forEach((KVPair) => {
        obj[KVPair.key] = KVPair.value;
    });
    return obj;
};
Object.getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
};
//# sourceMappingURL=Util.js.map