import ArgumentParser from "./argument_parser.js";
import { getCharactersFromFile } from "./file_reader.js";
import { computeResultsOptions } from "./compute.js";
import FileResults from "./file_results.js";

function main() {
    const ArgParser = new ArgumentParser();
    const args = process.argv.slice(2);
    ArgParser.parseArgs(args);

    // TODO: add error handling during parsing arguments here
    
    const files = ArgParser.files;
    const hasMultipleFiles = files.length > 1;
    const total = new FileResults("total");
    Promise.all(files.map(async (file) => {
        const charStream = await getCharactersFromFile(file);
        const results = computeResultsOptions(ArgParser.options, charStream, file);
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
}

main();