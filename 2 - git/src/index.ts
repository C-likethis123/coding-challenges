import { Command } from 'commander';
import GitRepository from './repo';

function main() {
    // TODO: how to use addCommand()
    const program = new Command();

    program
        .command('init')
        .action(() => {new GitRepository("..").init()});


    program
        .command('cat-file')
        .action(() => console.log('cat-file called'));
    
    program.parse();
}

main();