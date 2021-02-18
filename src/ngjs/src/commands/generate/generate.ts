import { isAbsolute, join } from "path";
import api from "../../api";
import controller from "../../controller";
import data from "../../data";
import service from "../../service";

let templates = new Map<string, (filename: string, version?: number) => string>();
templates.set("c", controller);
templates.set("controller", controller);
templates.set("s", service);
templates.set("service", service);
templates.set("d", data);
templates.set("data", data);
templates.set("a", api);
templates.set("api", api);

const denominators = new Map<string, string>();
denominators.set("c", "controller");
denominators.set("controller", "controller");
denominators.set("s", "service");
denominators.set("service", "service");
denominators.set("a", "api");
denominators.set("api", "api");
denominators.set("d", "");
denominators.set("data", "");

export default function generate(args: string[]): Implementation {
    if (args.length < 2)
        throw new Error(
            `Expected arguments: (type, path)\nSupplied arguments: (${
                (args[0], args[1])
            })`
        );

    let [type, path] = args;
    let template = templates.get(type);
    if (template === undefined)
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

    let implementation: Implementation = {
        filename: "",
        name: "",
        path: "",
        folder_path: "",
        content: "",
    };

    implementation.name = path.slice(path.lastIndexOf("/") + 1);
    implementation.content = template(implementation.name);

    implementation.folder_path = join(__dirname, path.slice(0, path.lastIndexOf("/")));
    if (type === "c" || type === "controller")
        implementation.folder_path = join(implementation.folder_path, implementation.name);
    else if (type === "d" || type === "data")
        implementation.folder_path = join(implementation.folder_path, "data");

    implementation.filename += implementation.name;
    if (denominator.length > 0)
        implementation.filename += `.${denominator}`;
    if (type === "a" || type === "api") {
        let index = args.indexOf("-v");
        let version = args[index + 1];
        if (index === -1)
            version = "1";

        implementation.filename += `.v${version}`;
        implementation.content = template(implementation.name, Number.parseInt(version));
    }
    implementation.filename += `.js`;

    implementation.path = join(
        implementation.folder_path,
        implementation.filename
    );

    return implementation;
}

interface Implementation {
    name: string;
    filename: string;
    path: string;
    content: string;
    folder_path: string;
}
