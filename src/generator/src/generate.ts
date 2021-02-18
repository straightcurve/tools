import { isAbsolute } from "path";
import Script from "./script";

export default function generate(path: string): Script {
    if (!isAbsolute(path))
        throw new Error("path needs to be absolute!");

    let script = {
        extension: "",
        filename: path.slice(path.lastIndexOf("/") + 1),
        name: "",
        path,
    };

    script.extension = script.filename.slice(script.filename.lastIndexOf(".") + 1);
    script.name = script.filename.slice(0, script.filename.indexOf("."));

    return script;
}
