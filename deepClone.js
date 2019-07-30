const _toString = val => Object.prototype.toString.call(val).slice(8, -1);
const isUndef = val => val === undefined || val === null;
const isRegOrDate = val => ["RegExp", "Date"].includes(_toString(val));
const isPrimitive = val => ["number", "string", "boolean", "symbol"].includes(typeof val) || isUndef(val) || isRegOrDate(val);
const deepClone = (() => {
    const cached = [];
    return (val) => {
        const index = cached.indexOf(val);
        if (~index) {
            return cached[index + 1];
        }
        let cloned;
        const typeStr = _toString(val);
        if (typeStr === "Object") {
            cloned = Object.create(null);
            cached.push(val, cloned);
            Object.keys(val).forEach(key => {
                const value = val[key];
                if (isPrimitive(value)) {
                    cloned[key] = value;
                } else {
                    cloned[key] = deepClone(value);
                }
            });
        } else if (typeStr === "Array") {
            cloned = [];
            cached.push(val, cloned);
            val.forEach((value, index) => {
                if (isPrimitive(value)) {
                    cloned[index] = value;
                } else {
                    cloned[index] = deepClone(value);
                }
            });
        } else {
            cloned[key] = val;
        }
        return cloned;
    };
})();

export {
    deepClone
}