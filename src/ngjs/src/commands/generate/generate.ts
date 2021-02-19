import { isAbsolute } from "path";
import API from "../../api";
import Controller from "../../controller";
import Data from "../../data";
import Service from "../../service";
import Structure from "../../structure";

let builders = new Map<string, (args: string[]) => Structure>();
builders.set("c", Controller.from);
builders.set("controller", Controller.from);
builders.set("s", Service.from);
builders.set("service", Service.from);
builders.set("d", Data.from);
builders.set("data", Data.from);
builders.set("a", API.from);
builders.set("api", API.from);

const denominators = new Map<string, string>();
denominators.set("c", "controller");
denominators.set("controller", "controller");
denominators.set("s", "service");
denominators.set("service", "service");
denominators.set("a", "api");
denominators.set("api", "api");
denominators.set("d", "");
denominators.set("data", "");

export default function generate(args: string[]): Structure {
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

    let denominator = denominators.get(type);
    if (denominator === undefined)
        throw new Error(
            `Can't find denominator for ${type}\nSupported types: (api | controller | data | service)`
        );

    return build(args.slice(1));

    // let implementation: Implementation = {
    //     filename: "",
    //     name: "",
    //     path: "",
    //     folder_path: "",
    //     template: "",
    // };

    // implementation.name = path.slice(path.lastIndexOf("/") + 1);
    // implementation.template = template(implementation.name);

    // implementation.folder_path = join(__dirname, path.slice(0, path.lastIndexOf("/")));
    // if (type === "c" || type === "controller")
    //     implementation.folder_path = join(implementation.folder_path, implementation.name);
    // else if (type === "d" || type === "data")
    //     implementation.folder_path = join(implementation.folder_path, "data");

    // implementation.filename += implementation.name;
    // if (denominator.length > 0)
    //     implementation.filename += `.${denominator}`;
    // if (type === "a" || type === "api") {
    //     let index = args.indexOf("-v");
    //     let version = args[index + 1];
    //     if (index === -1)
    //         version = "1";

    //     implementation.filename += `.v${version}`;
    //     implementation.template = template(implementation.name, Number.parseInt(version));
    // }
    // implementation.filename += `.js`;

    // implementation.path = join(
    //     implementation.folder_path,
    //     implementation.filename
    // );
}
