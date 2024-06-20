import { FLAG_PREFIX, STDIN } from "./constants.js";

class ArgumentParser {
    options = {
        isLineCount: true,
        isByteCount: true,
        isWordCount: true,
    }
    // TODO: implement multiline count?
    files = [];
    constructor() {}
    parseArgs(args) {
        // TODO: seems ugly to implement a default OPTIONS, then override it with an option later.
        // is there a more elegant construct?
        let hasOptions = false;
        const options = {
            isLineCount: false,
            isByteCount: false,
            isWordCount: false,
        };
        for (const arg of args) {
            if (arg.startsWith(FLAG_PREFIX)) {
                hasOptions = true;
                for (const option of arg) {
                    if (option === "c") {
                        options.isByteCount = true;
                    }
                    if (option === "l") {
                        options.isLineCount = true;
                    }
                    if (option === "w") {
                        options.isWordCount = true;
                    }
                }
            } else {
                this.files.push(arg);
            }
        }

        if (this.files.length === 0) {
            this.files.push(STDIN);
        }
        if (hasOptions) {
            this.options = options;
        }
    }
}

export default ArgumentParser;