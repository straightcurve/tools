import { assert } from "chai";
import { join } from "path";
import Data from "./data";

describe("generate data structure", () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => Data.parse([]));
    });

    it("should create data directory in current directory", () => {
        assert.equal(Data.from(["hello"]).folder_path, join(__dirname, "data"));
    });

    it("should set proper name if it ends with .js", () => {
        let impl = Data.from([join("../test", "zxc.js"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.js");
        assert.equal(impl.path, join(__dirname, "../test/data", "zxc.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/data"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = Data.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.js");
        assert.equal(impl.path, join(__dirname, "../test/data", "zxc.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/data"));
    });

    it("should set proper name for dynamic version data", () => {
        let impl = Data.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.js");
        assert.equal(impl.path, join(__dirname, "../test/data", "zxc.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/data"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = Data.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc/data", "xyz.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc/data"));
    });

    it("should set proper name for dynamic version data relative", () => {
        let impl = Data.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc/data", "xyz.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc/data"));
    });
});
