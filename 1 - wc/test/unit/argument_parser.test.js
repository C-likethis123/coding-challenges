import ArgumentParser from "../../argument_parser.js"
import { STDIN } from "../../constants.js";

describe("ArgumentParser - Options", () => {
    test("default - wc reads from stdin and specifies all options", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs([]);
        // TODO: it is ugly that I am using an imperative style of programming. This is brittle and subject to change.
        expect(testArgumentParser.files).toStrictEqual([STDIN]);
        expect(testArgumentParser.options).toStrictEqual({
            isLineCount: true,
            isByteCount: true,
            isWordCount: true,
        });
    });

    test("wc - single options", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs(["-c"]);

        expect(testArgumentParser.files).toStrictEqual([STDIN]);
        expect(testArgumentParser.options).toStrictEqual({
            isLineCount: false,
            isByteCount: true,
            isWordCount: false,
        });
    });

    test("wc - multiple options", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs(["-cl"]);

        expect(testArgumentParser.files).toStrictEqual([STDIN]);
        expect(testArgumentParser.options).toStrictEqual({
            isLineCount: true,
            isByteCount: true,
            isWordCount: false,
        });
    });

    test("wc - multiple options in different tokens", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs(["-c,-l"]);

        expect(testArgumentParser.files).toStrictEqual([STDIN]);
        expect(testArgumentParser.options).toStrictEqual({
            isLineCount: true,
            isByteCount: true,
            isWordCount: false,
        });
    });

    test("wc - all options specified", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs(["-clw"]);

        expect(testArgumentParser.files).toStrictEqual([STDIN]);
        expect(testArgumentParser.options).toStrictEqual({
            isLineCount: true,
            isByteCount: true,
            isWordCount: true,
        });
    });
});

describe("Argument Parser - Files", () => {
    test("Single file name, no options", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs(["file1.txt"]);

        expect(testArgumentParser.files).toStrictEqual(["file1.txt"]);
    });

    test("Multiple file names", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs(["file1.txt","file2.txt","file3.txt"]);
        expect(testArgumentParser.files).toStrictEqual(["file1.txt", "file2.txt", "file3.txt"]);
    });
});

describe("Argument Parser - Files and Options", () => {
    test("Multiple file names with options", () => {
        const testArgumentParser = new ArgumentParser();
        testArgumentParser.parseArgs(["-c","test.txt","-l","file1.txt"]);

        expect(testArgumentParser.files).toStrictEqual(["test.txt", "file1.txt"]);
        expect(testArgumentParser.options).toStrictEqual({
            isLineCount: true,
            isByteCount: true,
            isWordCount: false,
        });
    });
});


// TODO implement the edge cases: what if the file name starts with a flag?