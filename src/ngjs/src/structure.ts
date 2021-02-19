import { isAbsolute, join } from "path";

export default interface Structure {
    namespace: string;
    name: string;
    filename: string;
    path: string;
    template: string;
    folder_path: string;
}

export interface BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
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
        return join(
            this.folder_path,
            this.filename
        );
    }

    /**
     * absolute path to the destination's parent folder
     */
    public folder_path: string;

    /**
     * the name of the structure as passed in by the user
     */
    public name: string;

    constructor(args: BaseStructureOptions) {
        this.name = args.path.slice(args.path.lastIndexOf("/") + 1);
        if (this.name.endsWith(".js"))
            this.name = this.name.slice(0, this.name.lastIndexOf(".js"));

        this.namespace = args.namespace || "__app";
        this.version = args.version;
        this.folder_path = this.compute_folder_path(args.path);
    }

    public abstract get template(): string;

    protected compute_folder_path(path: string): string {
        if (isAbsolute(path))
            return path.slice(0, path.lastIndexOf("/"));

        return join(__dirname, path.slice(0, path.lastIndexOf("/")));
    }

    /**
     * @returns `course` => `Course`
     */
    protected get capitalized_name(): string {
        return `${this.name[0].toUpperCase()}${this.name.slice(1)}`;
    }
}
