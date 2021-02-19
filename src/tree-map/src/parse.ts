import cheerio from "cheerio";
import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import rec_scan_files from "../../generator/src/rec_scan_files";

export default function parse(dir: string): Node[] {
    const _public = join(cwd(), dir);

    let files = rec_scan_files(_public);
    let html_files = files.filter((f) => f.endsWith(".html"));

    //@ts-ignore
    let nodes: Node[] = html_files
        .map((path) => {
            let content = readFileSync(path).toString();
            let $ = cheerio.load(content);

            let includes = [
                ...$("ng-include")
                    .filter((e, elem) => {
                        let src = read_src(elem.attribs);
                        if (src === null) return false;

                        let abs_src_path = join(_public, src);
                        return abs_src_path !== path;
                    })
                    .toArray(),
                ...$("[ng-include]")
                    .filter((e, elem) => {
                        let src = read_src(elem.attribs);
                        if (src === null) return false;

                        let abs_src_path = join(_public, src);
                        return abs_src_path !== path;
                    })
                    .toArray(),
            ];

            let child: Node = {
                path,
                //@ts-ignore
                children: [],
                nodes: [],
            };

            if (includes.length === 0)
                return child;

            //@ts-ignore
            child.children = includes
            .map((e) => {
                let src = read_src(e.attribs);
                if (src === null) return null;

                return join(_public, src);
            })
            .filter((src) => src !== null);

            return child;
        })
        .filter((n) => n !== null);

    nodes.forEach(rec_find_children_nodes);

    return nodes;

    function rec_find_children_nodes(parent: Node) {
        parent.children.forEach((cpath) => {
            let child = nodes.find((cn) => cn.path === cpath);
            if (child === undefined) return;

            parent.nodes.push(child);
            nodes = nodes.filter((n) => n !== child);

            rec_find_children_nodes(child);
        });
    }
}

function read_src(attribs: {
    [name: string]: string;
}) {
    let path = attribs["ng-include"] || attribs.src;
    let code = path.charCodeAt(0);
    if (code !== "'".charCodeAt(0) && code !== '"'.charCodeAt(0)) return null;

    return path.slice(1, path.length - 1);
}

export interface Node {
    path: string;
    nodes: Node[];
    children: string[];
}
