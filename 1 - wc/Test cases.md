# Test cases
TODO convert this to a series of automated tests :D
Dimensions
- Options: line count, byte count, word count
- Input source: standard input, file name
- Number of input sources: we can specify multiple files

## No option displayed, no standard input
wc
- waits for standard input

## No option, has input source
wc [file source]
- read from the source
- displays number of lines, words and bytes contained in each input file.
- formatted

## Has option displayed
- Only retrieve the option
- If there is no file, wait for standard input

## Options
- c: byte count. Will cancel out -m 
- l: number of lines
- m: cancels out -c


## Number of input sources
- Displays the file name, followed by all the options

# Code concerns

## Argument parsing
- feature flags: denoted by -, followed by number of options
- read from standard input

## File input
- convert files to character streams
- read from standard input or file stream
- standard input: research how to read from standard input?
- file stream: research how to read from a file in node.js?

## Computation
- Read character stream and compute according to the options

## Output formatting
- File name
- File results: only one option or all options

## Number of input sources

- 1 input source: display the results without a total
- multiple input sources: display the results with a total
# Definitions

- word: a string of characters delimited by white spce characters
- white space characters: set of characters for which the iswspace function returns true