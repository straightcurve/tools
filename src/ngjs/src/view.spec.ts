import { assert } from "chai";
import { join } from "path";
import View from "./view";

describe("generate view structure", () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => View.parse([]));
    });

    it("should create directory with view name in current directory", () => {
        assert.equal(View.from(["hello"]).folder_path, join(__dirname, "hello"));
    });

    it("should set proper name if it ends with .html", () => {
        let impl = View.from([join("../test", "zxc.html"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.html");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "zxc.html"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = View.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.html");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "zxc.html"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });

    it("should set proper name for dynamic version view", () => {
        let impl = View.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.html");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "zxc.html"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = View.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.html");
        assert.equal(impl.path, join(__dirname, "../test/zxc/xyz", "xyz.html"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc/xyz"));
    });

    it("should set proper name for dynamic version view relative", () => {
        let impl = View.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.html");
        assert.equal(impl.path, join(__dirname, "../test/zxc/xyz", "xyz.html"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc/xyz"));
    });
});
