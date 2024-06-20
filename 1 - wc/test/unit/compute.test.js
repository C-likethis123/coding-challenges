import { computeByteCount, computeLineCount, computeResults, computeWordCount } from "../../compute";

/**
 * TODO: Logic is difficult to unit test
 * a sign that this needs more decoupling
 * The end result is a FileResults object.
 * 
 * exporting the compute[] functions for unit testing.
 * but i personally think the only interface that should be exposed is
 * 'computeResults
 */
describe('computeLineCount', () => {
    test('single line files returns 0', () => {
        const input = "test";
        expect((computeLineCount(input))).toBe(0);
    });

    test('single line files with extra newline returns 1', () => {
        const input = "test\n";
        expect(computeLineCount(input)).toBe(1);
    });

    test('multi line files returns the correct input', () => {
        const input = "line 1\nline2\nline3\n";
        expect(computeLineCount(input)).toBe(3);
    })
});


describe('computeByteCount', () => {
    test('alphanumeric input', () => {
        const input = "abcde";
        expect(computeByteCount(input)).toBe(5);
    });

    test('includes whitespaces and newlines', () => {
        const input = "this is supposed to be     30\n";
        expect(computeByteCount(input)).toBe(30);
    });
});

describe('computeWordCount', () => {
    test('single words', () => {
        const input = 'one';
        expect(computeWordCount(input)).toBe(1);
    });

    test('multiple words', () => {
        const input = ' this is the addition of a fewwww wordsss123    \n';
        expect(computeWordCount(input)).toBe(8);
    });

    test('with leading and trailing whitespace', () => {
        const input = ' this is the addition of a fewwww wordsss123    ';
        expect(computeWordCount(input)).toBe(8);
    });

    test('ignores newlines', () => {
        const input = ' this is the addition of a fewwww\nwordsss123    \n\n \n';
        expect(computeWordCount(input)).toBe(8);
    });
});

describe('computeResults', () => {
    test('adds according to options', () => {
        const options = {
            isLineCount: true,
        };
        const input = 'this is a line\n'
        const { results } = computeResults(options, input, "test_input")
        expect(results.lineResults).toBe(1);
    })
})