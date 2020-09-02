
export default function buildClass() {
    return new ClassBuilder();
}

class ClassBuilder {
    classString: string;
    constructor() {
        this.classString = '';
    }

    add(c: string) {
        this.classString += ' ' + c;
        return this;
    }

    addIf(c: string, condition: (boolean | (() => boolean))) {
        if (isFunc(condition) ? condition() : condition) {
            this.add(c);
        }
        return this;
    }

    done() {
        return this.classString;
    }
}

function isFunc(condition: (boolean | (() => boolean))): condition is (() => boolean) {
    return (condition as (() => boolean)).length !== undefined;
}