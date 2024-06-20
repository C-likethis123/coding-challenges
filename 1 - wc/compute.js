import FileResults from "./file_results.js";
/**
 * Computes the required information given a character stream and the list of options given
 */

/**
 * 
 * @param {CharStream} charStream
 */
export function computeLineCount(charStream) {
    return charStream.split(/\n/).length - 1;
}

/**
 * @param {CharStream}
 */
export function computeByteCount(charStream) {
    return charStream.length;
}

/**
 * @param {CharStream}
 */
export function computeWordCount(charStream) {
    // remove leading&trailing whitespace, or empty strings end up in the split array
    return charStream.trim().split(/\s+/).length;
}

/**
 * @param {ArgOptions} a list of options related to the app
 * @param {charStream} file contents
 * @param {string} file name
 * @returns {FileResult} that indicates file options
 */
export function computeResults(options, charStream, fileName) {
    const results = new FileResults(fileName);
    if (options.isLineCount) {
        results.addLineResults(computeLineCount(charStream));
    }
    if (options.isWordCount) {
        results.addWordResults(computeWordCount(charStream));
    }
    if (options.isByteCount) {
        results.addByteResults(computeByteCount(charStream));
    }
    return results;
}
