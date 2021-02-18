import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import generate from "./generate";

export default function execute(args: string[]) {
    let implementation = generate(args);

    if (existsSync(implementation.path))
        return console.error(`[ EXISTS ] ${implementation.path}`)

    execSync(`mkdir -p ${implementation.folder_path}`);
    
    writeFileSync(implementation.path, implementation.content);

    console.log(`[ CREATED ] ${implementation.path}`);
}
