import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import generate from "./generate";

export default function execute(args: string[]) {
    let structures = generate(args);
    if (structures.length === 0)
        return console.log(`No operations executed.`);

    structures.forEach(structure => {
        if (existsSync(structure.path))
            return console.error(`[ EXISTS ] ${structure.path}`)
    
        execSync(`mkdir -p ${structure.folder_path}`);
        
        writeFileSync(structure.path, structure.template);
    
        console.log(`[ CREATED ] ${structure.path}`);
    });
}
