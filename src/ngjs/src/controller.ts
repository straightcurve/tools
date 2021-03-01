
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
import ControllerTemplate from "./templates/controller";

export interface ControllerOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class Controller extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename() {
        return `${this.name}.controller.js`;
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

    public static parse(args: string[]): ControllerOptions {
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

    public static from(args: string[]): Controller {
        return new Controller(Controller.parse(args));
    }

    public static generate(args: string[]): Structure[] {
        let controller = Controller.from(args);
    
        return [controller];
    }

    constructor(args: ControllerOptions) {
        super(args);
    }

    public get template() {
        return ControllerTemplate.get_content(this.name);
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), this.name);
    }
}
