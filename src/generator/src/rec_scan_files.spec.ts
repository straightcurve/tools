import { assert } from "chai";
import { join } from "path";
import rec_scan_files from "./rec_scan_files";

describe("recursively scan files", () => {
    it("should accept relative path", () => {
        let path = "src/generator/test/empty";

        assert.doesNotThrow(() => rec_scan_files(path));
    });

    it("should accept absolute path", () => {
        let path = join(__dirname, "../", "test", "empty");

        assert.doesNotThrow(() => rec_scan_files(path));
    });

    it("should accept parent absolute path", () => {
        let path = join(__dirname, "../", "../");

        assert.doesNotThrow(() => rec_scan_files(path));
    });

    it("should throw on file passed in", () => {
        let path = join(__dirname, "../", "rec_scan.ts");

        assert.throws(() => rec_scan_files(path));
    });

    it("should return empty array on empty directory", () => {
        let path = join(__dirname, "../", "test", "empty");

        assert.isEmpty(rec_scan_files(path));
        assert.isEmpty(rec_scan_files(path));
    });

    it("should return files count", () => {
        let path = join(__dirname, "../", "test", "parent");
        let result = rec_scan_files(path);

        assert.equal(result.length, 2);

        path = join(__dirname, "../", "test", "files");
        assert.isTrue(rec_scan_files(path).length === 3);
    });

    it("should return array with the absolute paths of the files inside the directory", () => {
        let path = join(__dirname, "../", "test", "files");
        let result = rec_scan_files(path);

        assert.isTrue(result.length === 3);
        assert.isTrue(result[0] === join(path, "_file"));
        assert.isTrue(result[1] === join(path, "_file copy"));
        assert.isTrue(result[2] === join(path, "_file copy 2"));
    });

    it("should return array with the absolute paths of the files inside child directories", () => {
        let path = join(__dirname, "../", "test", "dirs");
        let result = rec_scan_files(path);

        assert.isTrue(result.length === 8);
        assert.isTrue(result[0] === join(path, "_file"));
        assert.isTrue(result[1] === join(path, "_file copy"));
        assert.isTrue(result[2] === join(path, "_file copy 2"));
        assert.isTrue(result[3] === join(path, "dir", "_file"));
        assert.isTrue(result[4] === join(path, "dir", "_file copy"));
        assert.isTrue(result[5] === join(path, "dir", "_file copy 2"));
        assert.isTrue(result[6] === join(path, "dir copy", "_file copy"));
        assert.isTrue(result[7] === join(path, "dir copy 2", "_file copy 2"));
    });

    it("should filter files based on user specified function", () => {
        let path = join(__dirname, "../", "test", "dirs");
        let result = rec_scan_files(path, (file) => {
            return file.includes("2");
        });

        assert.isTrue(result.length === 3);
        assert.isTrue(result[0] === join(path, "_file copy 2"));
        assert.isTrue(result[1] === join(path, "dir", "_file copy 2"));
        assert.isTrue(result[2] === join(path, "dir copy 2", "_file copy 2"));
    });
});
