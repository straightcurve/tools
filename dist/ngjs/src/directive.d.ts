import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
export interface DirectiveOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export default class Directive extends BaseStructure {
    /**
     * the name the file is going to be saved as
     */
    get filename(): string;
    /**
     * the version
     * @summary not used but might be used..?
     * @default 1
     */
    version: number;
    /**
     * destination to write the file to
     * (absolute path)
     */
    get path(): string;
    static parse(args: string[]): DirectiveOptions;
    static from(args: string[]): Directive;
    static generate(args: string[]): Structure[];
    constructor(args: DirectiveOptions);
    get template(): string;
    protected compute_folder_path(path: string): string;
}
