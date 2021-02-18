import fs, { statSync } from "fs";
import { isAbsolute, join } from "path";

export default function scan (dir: string): ScanResult {
    if (!isAbsolute(dir))
        dir = join(__dirname, dir);

    let stat = statSync(dir);
    if (!stat.isDirectory())
        throw new Error(`${dir} is not a directory!`);

    let files = fs.readdirSync(dir);
    if (files.length === 0)
        return {
            files: [],
            dirs: [],
        };

    return {
        files: files.filter(f => {
            let path = join(dir, f);
    
            return !(statSync(path).isDirectory());
        }),
        dirs: files.filter(f => {
            let path = join(dir, f);
    
            return (statSync(path).isDirectory());
        }),
    };
};

export interface ScanResult {
    files: string[],
    dirs: string[],
}
