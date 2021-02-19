import cheerio from "cheerio";
import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import generate from "./generate";

export default function execute(args: string[]) {
    let structures = generate(args);
    if (structures.length === 0)
        return console.log(`No operations executed.`);

    const _public = "/public/";
    let created: string[] = [];

    structures.forEach(structure => {
        if (existsSync(structure.path))
            return console.error(`[ EXISTS ] ${structure.path}`)
    
        execSync(`mkdir -p ${structure.folder_path}`);
        
        writeFileSync(structure.path, structure.template);
    
        console.log(`[ CREATED ] ${structure.path}`);

        if (structure.filename.endsWith(".js"))
            created.push(structure.path.slice(structure.path.indexOf(_public) + _public.length));
    });

    let structure_dir = join(cwd(), args[1])
    let public_path = structure_dir.slice(0, structure_dir.indexOf(_public) + _public.length);
    let index_html_path = join(public_path, "index.html");
    if (!existsSync(index_html_path))
        return console.warn(`Couldn't find index.html at path: ${index_html_path}`);

    let $ = cheerio.load(readFileSync(index_html_path).toString());
    created.forEach(s => {
        $("body").append(`<script src="${s}"></script>\n`);
    });
    writeFileSync(index_html_path, $.html());
}
