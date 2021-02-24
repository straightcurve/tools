import chalk from "chalk";
import { execSync } from "child_process";
import rec_scan_files from "../../generator/src/rec_scan_files";

const command = `sed __dry_run"__pattern" __file`;

export default function strip_IIFE(dir: string, dry_run: boolean) {
    let files = rec_scan_files(dir, (file: string) => file.endsWith(".js"));

    const header_patterns = [
        "(function () {",
    ];
    const header_pattern = header_patterns.map(p => (`0,/${p}/s///;`)).join("");
    const footer_patterns = [
        "})()",
    ];
    const footer_pattern = footer_patterns.map(p => (`$ s/${p}//;`)).join("");

    let commands = files.map(file => {
        return command
            .replace(`__pattern`, header_pattern + footer_pattern)
            .replace("__file", file)
            .replace("__dry_run", dry_run ? "" : "-i ");
    });

    commands.forEach(execSync);

    console.log(`${chalk.green("[ SUCCESS ]")} The operation completed successfully.`);
}
