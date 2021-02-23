import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
export interface ControllerOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export default class Controller extends BaseStructure {
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
    static parse(args: string[]): ControllerOptions;
    static from(args: string[]): Controller;
    static generate(args: string[]): Structure[];
    constructor(args: ControllerOptions);
    get template(): string;
    protected compute_folder_path(path: string): string;
}
