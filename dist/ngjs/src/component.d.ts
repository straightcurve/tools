import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
export interface ComponentOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export default class Component extends BaseStructure {
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
    static parse(args: string[]): ComponentOptions;
    static from(args: string[]): Component;
    static generate(args: string[]): Structure[];
    constructor(args: ComponentOptions);
    get template(): string;
    /**
     * @returns `/root/hello` => `/root/hello/hello.html`
     * @returns `/root/public/hello` => `hello/hello.html`
     */
    get html_path(): string;
    protected compute_folder_path(path: string): string;
}
