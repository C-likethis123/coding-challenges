/**
 * Everytime we run a Git command, we are trying to modify a repfsitory
 * A Git repository is made of:
 *  * a work tree - where files are meant to be in version control
 *  * a git directory - where Git stores its own data
 */
import * as path from "path";
import {promises as fs} from "fs";
// TODO: rabbit hole - why is import * as ConfigParser different from import ConfigParser, if "configparser" uses a default export?
// and what is the diff between those and require('configparser')
const ConfigParser = require('configparser');

class GitRepository {
    private worktree: string;
    private gitdir: string;
    private conf: typeof ConfigParser;
    // TODO: this async thing is a little annoying.
    // would have placed init() code in the constructor if I could
    constructor(dir: string) {
        this.worktree = dir;
        this.gitdir = path.resolve(dir, ".git");
        this.conf = new ConfigParser();
    }

    async init(force=false) {
        try {
            const stats = await fs.stat(this.gitdir);
            if (!(force || stats.isDirectory())) {
                throw new Error(`Not a Git repository ${this.worktree}`);
            }
            this.conf.read(path.resolve(this.gitdir, "config"));
        } catch(err) {
            throw new Error(`Error reading directory: ${this.worktree}`);
        }
        if (!force) {
            const version = Number(this.conf.get("core", "repositoryformatversion"));
            if (version != 0) {
                throw new Error(`Unsupported repositoryformatversion ${version}`);
            }
            return version;
        }
    }
}

export default GitRepository;