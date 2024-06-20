import ArgumentParser from "./argument_parser.js";
import { getCharactersFromFile } from "./file_reader.js";
import { computeResults } from "./compute.js";
import FileResults from "./file_results.js";

function main() {
    const ArgParser = new ArgumentParser();
    const args = process.argv.slice(2);
    try {
        ArgParser.parseArgs(args);
    
        const files = ArgParser.files;
        const hasMultipleFiles = files.length > 1;
        const total = new FileResults("total");
        Promise.all(files.map(async (file) => {
            const charStream = await getCharactersFromFile(file);
            const results = computeResults(ArgParser.options, charStream, file);
            results.print();
            if (hasMultipleFiles) {
                total.addFileResults(results);
            }
        }))
        .then(() => {
            if (hasMultipleFiles) {
                total.print();
            }
        })
        .catch((err) => console.error(err))
    } catch (error) {
       console.error(error.message); 
    }
}

main();