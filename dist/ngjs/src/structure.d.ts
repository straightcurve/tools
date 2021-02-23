export default interface Structure {
    namespace: string;
    name: string;
    filename: string;
    path: string;
    template: string;
    folder_path: string;
}
export interface BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}
export declare abstract class BaseStructure {
    namespace: string;
    /**
     * the name the file is going to be saved as
     */
    abstract get filename(): string;
    /**
     * the version
     * @default 1
     */
    version: number;
    /**
     * destination to write the file to
     * (absolute path)
     */
    get path(): string;
    /**
     * absolute path to the destination's parent folder
     */
    folder_path: string;
    /**
     * the name of the structure as passed in by the user
     */
    name: string;
    abstract get template(): string;
    constructor(args: BaseStructureOptions);
    protected compute_folder_path(path: string): string;
    protected compute_name(name: string): string;
}
/**
 * @returns `course-discussion-topics` => `courseDiscussionTopics`
 */
export declare function to_camel_case(str: string): string;
/**
 * @returns `/root/hello` => `/root/hello/hello.html`
 * @returns `/root/public/hello` => `hello/hello.html`
 */
export declare function to_angular_js_identifier(folder_path: string, name: string): string;
/**
 * @returns `course-discussion-topics` => `Course-discussion-topics`
 */
export declare function capitalize(str: string): string;
