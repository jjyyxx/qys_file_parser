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
Object.reverseFrom = function (KVArray) {
    let obj = {};
    KVArray.forEach(KVPair => {
        obj[KVPair.key] = KVPair.value;
    });
    return obj;
};
//# sourceMappingURL=Util.js.map