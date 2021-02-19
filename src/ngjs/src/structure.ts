import { isAbsolute, join } from "path";
import { cwd } from "process";

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

export abstract class BaseStructure {
    public namespace: string;

    /**
     * the name the file is going to be saved as
     */
    public abstract get filename(): string;

    /**
     * the version
     * @default 1
     */
    public version: number = 1;

    /**
     * destination to write the file to
     * (absolute path)
     */
    public get path(): string {
        return join(this.folder_path, this.filename);
    }

    /**
     * absolute path to the destination's parent folder
     */
    public folder_path: string;

    /**
     * the name of the structure as passed in by the user
     */
    public name: string;

    public abstract get template(): string;

    constructor(args: BaseStructureOptions) {
        this.name = this.compute_name(
            args.path.slice(args.path.lastIndexOf("/") + 1)
        );
        this.namespace = args.namespace || "__app";
        this.version = args.version;
        this.folder_path = this.compute_folder_path(args.path);
    }

    protected compute_folder_path(path: string): string {
        if (!path.includes("/")) return cwd();

        if (isAbsolute(path)) return path.slice(0, path.lastIndexOf("/"));

        return join(cwd(), path.slice(0, path.lastIndexOf("/")));
    }

    protected compute_name(name: string): string {
        if (name.endsWith(".js")) name = name.slice(0, name.lastIndexOf(".js"));

        return name;
    }
}

/**
 * @returns `course-discussion-topics` => `courseDiscussionTopics`
 */
export function to_camel_case(str: string): string {
    let split = str.split("-");
    return (
        split[0] +
        split
            .slice(1)
            .map((s) => {
                return `${s[0].toUpperCase()}${s.slice(1)}`;
            })
            .join("")
    );
}

/**
 * @returns `/root/hello` => `/root/hello/hello.html`
 * @returns `/root/public/hello` => `hello/hello.html`
 */
export function to_angular_js_identifier(
    folder_path: string,
    name: string
): string {
    const _public = "/public/";

    if (folder_path.includes(_public))
        return to_camel_case(
            folder_path
                .slice(folder_path.indexOf(_public) + _public.length)
                .replace(/\//g, "-")
        );

    let split = folder_path.split("/");
    split = split.slice(split.length - 2);
    return to_camel_case(split.join("-"));
}

/**
 * @returns `course-discussion-topics` => `Course-discussion-topics`
 */
export function capitalize(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}
