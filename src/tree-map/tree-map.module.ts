/**
 * @module tree-map
 */

import { writeFileSync } from "fs";
import { isAbsolute, join } from "path";
import { argv, cwd, exit } from "process";
import parse, { Node } from "./src/parse";

let args = argv.slice(2);
let in_public_dir: string = configure_in_dir_path("-path", "./src/tree-map/test/attribute");
let out_tree: string = configure_out_file_path("-tree", "tree.json");
let out_slices: string = configure_out_file_path("-slices", "slices.json");

let tree = parse(in_public_dir);

const get_path_relative_to_public = (path: string) => {
    return path.slice(path.indexOf("public"));
};

const get_children_with_paths_relative_to_public = (nodes: Node[]) => {
    return nodes.map(child => {
        child.path = get_path_relative_to_public(child.path);
        child.nodes = get_children_with_paths_relative_to_public(child.nodes);

        return child;
    });
};

tree = get_children_with_paths_relative_to_public(tree);

const slice = (children: Node[], depth: number = 0, slices: string[][] = []) => {
    if (children.length === 0)
        return slices;

    if (slices[depth] === undefined)
        slices[depth] = [];
    slices[depth].push(...children.map(c => c.path));

    depth++;

    children.forEach(c => slice(c.nodes, depth, slices));

    return slices;
};

let slices = slice(tree);

const fmt = (nodes: Node[]): any => {
    return nodes.map(n => ({
        path: n.path,
        children: fmt(n.nodes),
    }));
};

writeFileSync(out_tree, JSON.stringify(fmt(tree), null, 4));
console.log(`[ CREATED ] ${out_tree}`);

writeFileSync(out_slices, JSON.stringify(slices, null, 4));
console.log(`[ CREATED ] ${out_slices}`);

function display_help() {
    console.log(`
    Usage: 
        tree-map [...options]

    Options:
        -p          [ path ]    the relative path to the public directory (required)
        -tree       [ path ]    relative path to tree output file
        -slices     [ path ]    relative path to slices output file
    `);
}

function configure_out_file_path(option: string, _default: string) {
    let out_file: string = _default;
    if (args.includes(option))
        out_file = args[args.indexOf(option) + 1];
    if (out_file === undefined) {
        console.error(`Used ${option} but didn't specify a value!`);
        exit(1);
    }

    if (!isAbsolute(out_file))
        out_file = join(cwd(), out_file);
    
    return out_file;
}

function configure_in_dir_path(option: string, _default: string | null) {
    let in_dir: string | null = _default;
    if (args.includes(option))
        in_dir = args[args.indexOf(option) + 1];
    if (in_dir === undefined) {
        console.error(`Used ${option} but didn't specify a value!`);
        exit(1);
    }

    if (in_dir === null) {
        console.error(`You need to use the ${option} option!`);
        console.log();
        display_help();
        exit(1);
    }

    return in_dir;
}
