import { join } from "path";
import scan from "./scan";

export default function rec_scan_files(dir: string, filter?: (file: string) => boolean): string[] {
    return _rec_scan_files(dir);

    function _rec_scan_files(dir: string, files: string[] = []): string[] {
        let result = scan(dir);

        let _files = result.files.map((f) => join(dir, f));
        if (filter)
            _files = _files.filter(filter);
        files.push(..._files);

        result.dirs.forEach((d) => _rec_scan_files(join(dir, d), files));

        return files;
    }
}
