import { assert } from "chai";
import { join } from "path";
import scan from "./scan";

describe("scan", () => {
    it("should accept relative path", () => {
        let path = "../test/empty";

        assert.doesNotThrow(() => scan(path));
    });

    it("should accept absolute path", () => {
        let path = join(__dirname, "../", "test", "empty");

        assert.doesNotThrow(() => scan(path));
    });

    it("should accept parent absolute path", () => {
        let path = join(__dirname, "../", "../");

        assert.doesNotThrow(() => scan(path));
    });

    it("should throw on file passed in", () => {
        let path = join(__dirname, "../", "scan.ts");

        assert.throws(() => scan(path));
    });

    it("should return empty array on empty directory", () => {
        let path = join(__dirname, "../", "test", "empty");

        assert.isEmpty(scan(path).files);
        assert.isEmpty(scan(path).dirs);
    });

    it("should return files count", () => {
        let path = join(__dirname, "../", "test", "parent");
        let result = scan(path);

        assert.isTrue(result.files.length === 1);

        path = join(__dirname, "../", "test", "files");
        assert.isTrue(scan(path).files.length === 3);
        assert.isTrue(scan(path).dirs.length === 0);
    });

    it("should return dirs count", () => {
        let path = join(__dirname, "../", "test", "parent");
        let result = scan(path);

        assert.isTrue(result.dirs.length === 1);
    });

    it("should return array with the file names inside the directory", () => {
        let path = join(__dirname, "../", "test", "files");
        let result = scan(path);

        assert.isTrue(result.files.length === 3);
        assert.isTrue(result.files[0] === "_file");
        assert.isTrue(result.files[1] === "_file copy");
        assert.isTrue(result.files[2] === "_file copy 2");
    });

    it("should return array with the dir names inside the directory", () => {
        let path = join(__dirname, "../", "test", "dirs");
        let result = scan(path);

        assert.isTrue(result.dirs.length === 3);
        assert.isTrue(result.dirs[0] === "dir");
        assert.isTrue(result.dirs[1] === "dir copy");
        assert.isTrue(result.dirs[2] === "dir copy 2");
    });
});
