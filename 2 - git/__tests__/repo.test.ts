import * as path from "path";
import GitRepository from "../src/repo";
import { promises as fs } from "fs";

/**
 * Learnings
 * 1. Return the promise or use the async keyword, or Jest will move on to the next function before the promise is completed.
 *    This may result in a scenario where there is an Error in the console but the tests "pass"
 *  2. use expect.assertions(1) to help test async code
 */

describe("GitRepository", () => {
    test("throws an error for non valid directory paths", () => {
        return expect(() => new GitRepository("not/a/directory").init()).rejects.toThrow("Error reading directory: not/a/directory");
    });

    test("does not throw an error for proper git directories", () => {
        // create file directory
        const gitDir = path.join(__dirname, "gyt");
        const dirPath = path.join(gitDir, ".git");
        const filePath = path.join(dirPath, "config")
        // why does this pass? also i notice that if i fail, the 'gyt' folder will still stay...
        return fs
            .mkdir(dirPath, { recursive: true })
            .then(() => fs.writeFile(filePath, "[core]\nrepositoryformatversion=0\n"))
            .then(() => new GitRepository(gitDir).init())
            .then((data) => {expect(data).toBe(0)})
            // prints the error to the console
            .catch((err) => {
                expect(err).toBe(0)
            })
            // remove file for cleanup
            .finally(() => {
                fs.rm(path.join(__dirname, "gyt"), {
                    recursive: true,
                    force: true,
                })
            })
    })

    test("throws an error for invalid repository version", () => {
        // create file directory
        expect.assertions(1);
        const gitDir = path.join(__dirname, "gyt");
        const dirPath = path.join(gitDir, ".git");
        const filePath = path.join(dirPath, "config");
        return fs
            .mkdir(dirPath, { recursive: true })
            .then(() => fs.writeFile(filePath, "[core]\nrepositoryformatversion=1\n"))
            .then(() => new GitRepository(gitDir).init())
            // prints the error to the console
            .catch((err) => {
                expect(err).toStrictEqual(new Error(`Unsupported repositoryformatversion 1`));
            })
            // remove file for cleanup
            .finally(() => {
                fs.rm(path.join(__dirname, "gyt"), {
                    recursive: true,
                    force: true,
                })
            });
    });
});