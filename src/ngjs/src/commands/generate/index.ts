import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import generate from "./generate";

export default function execute(args: string[]) {
    let structure = generate(args);
    if (structure === null)
        return console.log(`No operations executed.`);

    if (existsSync(structure.path))
        return console.error(`[ EXISTS ] ${structure.path}`)

    execSync(`mkdir -p ${structure.folder_path}`);
    
    writeFileSync(structure.path, structure.template);

    console.log(`[ CREATED ] ${structure.path}`);
}
