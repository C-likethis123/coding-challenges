import { STDIN } from "./constants.js";
import {promises} from "fs";
/**
 * TODO: promisify this API
 */
/**
 * @returns a character stream of letters from stdin
 */
function readStdin() {
    return new Promise((resolve, reject) => {
        let input = '';
        process.stdin.on('data', (chunk) => {
            input += chunk;
        });

        process.stdin.on('end', () => {
            resolve(input);
        });

        process.stdin.on('error', (err) => {
            reject(`Error: ${err}`);
        });
        // TODO: brain can't understand why this is needed for now. to revisit when brain is in a better state
        process.stdin.resume();
    });
}

/**
 * 
 * @param {string} fileName 
 * @returns a character stream
 */
async function readFile(fileName) {
    try {
        const data = await promises.readFile(fileName, 'utf8');
        return data;
    } catch (err) {
        throw new Error(`Error reading file: ${err}`);
    }
}

export async function getCharactersFromFile(fileName) {
    if (fileName === STDIN) {
        return await readStdin();
    } else {
        return await readFile(fileName);
    }
}