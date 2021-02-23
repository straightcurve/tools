import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
export interface ServiceOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export default class Service extends BaseStructure {
    /**
     * the name the file is going to be saved as
     */
    get filename(): string;
    /**
     * destination to write the file to
     * (absolute path)
     */
    get path(): string;
    static parse(args: string[]): ServiceOptions;
    static from(args: string[]): Service;
    static generate(args: string[]): Structure[];
    constructor(args: ServiceOptions);
    get template(): string;
}
