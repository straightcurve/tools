
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions } from "./structure";

export interface ModalViewOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class ModalView extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename(): string {
        return `${this.name}.html`;
    }

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

    public static parse(args: string[]): ModalViewOptions {
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

    public static from(args: string[]): ModalView {
        return new ModalView(ModalView.parse(args));
    }

    public static generate(args: string[]): Structure[] {
        let view = ModalView.from(args);
    
        return [view];
    }

    constructor(args: ModalViewOptions) {
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
<div class="modal-dialog" style="width: 60%; z-index: 9999998;">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" ng-click="cancel()">&times;</button>
            <h5 class="modal-title">__view_name</h5>
        </div>
        <div class="modal-body">
            Modal body here
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>
            <button type="button" class="btn btn-info" ng-click="success()">OK</button>
        </div>
    </div>
</div>

`.trimLeft();
}
