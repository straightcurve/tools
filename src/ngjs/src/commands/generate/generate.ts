import { isAbsolute } from "path";
import API from "../../api";
import Component from "../../component";
import Controller from "../../controller";
import Data from "../../data";
import Service from "../../service";
import Structure from "../../structure";
import View from "../../view";

let builders = new Map<string, (args: string[]) => Structure[]>();
builders.set("c", (args) => {
    let component = Component.from(args);
    let view = View.from([component.folder_path]);
    let controller = Controller.from([component.folder_path]);

    return [component, view, controller];
});
builders.set("component", (args) => {
    let component = Component.from(args);
    let view = View.from([component.folder_path]);
    let controller = Controller.from([component.folder_path]);

    return [component, view, controller];
});
builders.set("s", (args) => {
    let service = Service.from(args);

    return [service];
});
builders.set("service", (args) => {
    let service = Service.from(args);

    return [service];
});
builders.set("d", (args) => {
    let data = Data.from(args);

    return [data];
});
builders.set("data", (args) => {
    let data = Data.from(args);

    return [data];
});
builders.set("a", (args) => {
    let api = API.from(args);

    return [api];
});
builders.set("api", (args) => {
    let api = API.from(args);

    return [api];
});

export default function generate(args: string[]): Structure[] {
    if (args.length < 2)
        throw new Error(
            `Expected arguments: (type, path)\nSupplied arguments: (${
                (args[0], args[1])
            })`
        );

    let [type, path] = args;
    let build = builders.get(type);
    if (build === undefined)
        throw new Error(
            `Unknown type ${type}\nSupported types: (api | controller | data | service)`
        );

    if (isAbsolute(path))
        throw new Error(
            `Invalid path ${path}\nSpecify relative path or template name`
        );

    return build(args.slice(1));
}
