
import { join } from "path";
import { BaseStructure, BaseStructureOptions } from "./structure";

export interface ViewOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class View extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename(): string {
        return `${this.name}.html`;
    }

    /**
     * the version
     * @summary not used but might be used..?
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

    public get template() {
        return get_template()
            .replace(/__view_name/g, this.name);
    }

    public static parse(args: string[]): ViewOptions {
        if (args.length < 1)
            throw new Error("Wrong number of arguments, stat 0");

        let index = args.indexOf("-v");
        let version = args[index + 1];
        if (index === -1)
            version = "1";
        
        index = args.indexOf("-ns");
        let namespace: string | null = args[index + 1];
        if (index === -1)
            namespace = null;

        return {
            namespace,
            path: args[0],
            version: Number.parseInt(version),
        };
    }

    public static from(args: string[]): View {
        return new View(View.parse(args));
    }

    constructor(args: ViewOptions) {
        super(args);
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), this.name);
    }

    protected compute_name(name: string): string {
        if (name.endsWith(".html"))
            name = name.slice(0, name.lastIndexOf(".html"));

        return name;
    }
}

function get_template() {
    return `
<p>__view_name works!</p>
`.trimLeft();
}
