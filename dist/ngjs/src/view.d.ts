import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
export interface ViewOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export default class View extends BaseStructure {
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
    get template(): string;
    static parse(args: string[]): ViewOptions;
    static from(args: string[]): View;
    static generate(args: string[]): Structure[];
    constructor(args: ViewOptions);
    protected compute_folder_path(path: string): string;
    protected compute_name(name: string): string;
}
