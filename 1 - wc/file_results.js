/**
 * 
 */

class FileResults {
    fileName = "";
    results = {}
    constructor(label) {
        this.label = label;
    }
    addLineResults(lineResults) {
        this.results.lineResults = lineResults;
    }

    addWordResults(wordResults) {
        this.results.wordResults = wordResults;
    }

    addByteResults(byteResults) {
        this.results.byteResults = byteResults;
    }
    /**
     * @param {FileResults}
     */
    // TODO: refactor, this looks really ugly because why is the results so nested
    addFileResults(results) {
        const {results : fileResults} = results;
        if (fileResults.lineResults !== undefined) {
            this.results.lineResults = this.results.lineResults === undefined 
                                        ? fileResults.lineResults 
                                        : this.results.lineResults + fileResults.lineResults;
        }
        if (fileResults.wordResults !== undefined) {
            this.results.wordResults = this.results.wordResults === undefined
                                        ? fileResults.wordResults
                                        : this.results.wordResults + fileResults.wordResults;
        }
        if (fileResults.byteResults !== undefined) {
            this.results.byteResults = this.results.byteResults === undefined 
                                        ? fileResults.byteResults
                                        : this.results.byteResults + fileResults.byteResults;
        }
    }

    /**
     * todo: is it really necessary to put it in a separate array instead of printing it outright....
     */
    print() {
        const results = [];
        if (this.results.lineResults !== undefined) {
            results.push(this.results.lineResults);
        }
        if (this.results.wordResults !== undefined) {
            results.push(this.results.wordResults);
        }
        if (this.results.byteResults !== undefined) {
            results.push(this.results.byteResults);
        }
        console.log(`${results.join("\t")} ${this.label}`);
    }
}

export default FileResults;