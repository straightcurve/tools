import { isAbsolute } from "path";
import API from "../../api";
import Component from "../../component";
import Data from "../../data";
import Directive from "../../directive";
import Service from "../../service";
import Structure from "../../structure";

let builders = new Map<string, (args: string[]) => Structure[]>();
builders.set("c", Component.generate);
builders.set("component", Component.generate);
builders.set("s", Service.generate);
builders.set("service", Service.generate);
builders.set("d", Data.generate);
builders.set("data", Data.generate);
builders.set("a", API.generate);
builders.set("api", API.generate);
builders.set("dir", Directive.generate);
builders.set("directive", Directive.generate);

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
            `Unknown type ${type}\nSupported types: (api | component | data | directive | service)`
        );

    if (isAbsolute(path))
        throw new Error(
            `Invalid path ${path}\nSpecify relative path or file name`
        );

    return build(args.slice(1));
}
