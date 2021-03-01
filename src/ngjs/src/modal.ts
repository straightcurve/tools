import { join } from "path";
import ModalView from "./modal-view";
import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
import ModalTemplate from "./templates/modal";

export interface ModalOptions extends BaseStructureOptions {
    path: string;
    namespace: string | null;
    version: number;
}

export default class Modal extends BaseStructure {
    /**
     * the name the file is going to be saved as
     */
    public get filename(): string {
        return `${this.name}.modal.js`;
    }

    /**
     * destination to write the file to
     * (absolute path)
     */
    public get path(): string {
        return join(this.folder_path, this.filename);
    }

    public static parse(args: string[]): ModalOptions {
        if (args.length < 1)
            throw new Error("Wrong number of arguments, stat 0");

        let index = args.indexOf("-v");
        let version = args[index + 1];
        if (index === -1) version = "1";

        index = args.indexOf("-ns");
        let namespace: string | null = args[index + 1];
        if (index === -1) namespace = null;

        return {
            namespace,
            path: args[0],
            version: Number.parseInt(version),
        };
    }

    public static from(args: string[]): Modal {
        return new Modal(Modal.parse(args));
    }

    public static generate(args: string[]): Structure[] {
        let modal = Modal.from(args);
        let view = ModalView.from([modal.folder_path]);

        return [modal, view];
    }

    constructor(args: ModalOptions) {
        super(args);
    }

    public get template() {
        return ModalTemplate.get_content(this.name);
    }

    /**
     * @returns `/root/hello` => `/root/hello/hello.html`
     * @returns `/root/public/hello` => `hello/hello.html`
     */
    public get html_path(): string {
        const _public = "/public/";

        if (!this.folder_path.includes(_public))
            return join(this.folder_path, `${this.name}.html`);

        return join(
            this.folder_path.slice(
                this.folder_path.indexOf(_public) + _public.length
            ),
            `${this.name}.html`
        );
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), this.name);
    }
}
