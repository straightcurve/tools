
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
import ComponentTemplate from "./templates/component";
import View from "./view";

export interface ComponentOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class Component extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename(): string {
        return `${this.name}.component.js`;
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

    public static parse(args: string[]): ComponentOptions {
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

    public static from(args: string[]): Component {
        return new Component(Component.parse(args));
    }

    public static generate(args: string[]): Structure[] {
        let component = Component.from(args);
        let view = View.from([component.folder_path]);
    
        return [component, view];
    }

    constructor(args: ComponentOptions) {
        super(args);
    }

    public get template() {
        return ComponentTemplate.get_content(this.name, this.html_path);
    }

    /**
     * @returns `/root/hello` => `/root/hello/hello.html`
     * @returns `/root/public/hello` => `hello/hello.html`
     */
    public get html_path(): string {
        const _public = "/public/"; 

        if (!this.folder_path.includes(_public))
            return join(this.folder_path, `${this.name}.html`);

        return join(this.folder_path.slice(this.folder_path.indexOf(_public) + _public.length), `${this.name}.html`);
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), this.name);
    }
}
