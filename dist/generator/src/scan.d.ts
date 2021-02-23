export default function scan(dir: string): ScanResult;
export interface ScanResult {
    files: string[];
    dirs: string[];
}
