import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
export interface APIOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export default class API extends BaseStructure {
    /**
     * the name the file is going to be saved as
     */
    get filename(): string;
    /**
     * destination to write the file to
     * (absolute path)
     */
    get path(): string;
    static parse(args: string[]): APIOptions;
    static from(args: string[]): API;
    static generate(args: string[]): Structure[];
    constructor(args: APIOptions);
    get template(): string;
}
