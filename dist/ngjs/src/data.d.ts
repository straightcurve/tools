import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
export interface DataOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export default class Data extends BaseStructure {
    /**
     * the name the file is going to be saved as
     */
    get filename(): string;
    /**
     * destination to write the file to
     * (absolute path)
     */
    get path(): string;
    static parse(args: string[]): DataOptions;
    static from(args: string[]): Data;
    static generate(args: string[]): Structure[];
    constructor(args: DataOptions);
    get template(): string;
    protected compute_folder_path(path: string): string;
}
