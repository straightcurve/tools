import { assert } from "chai";
import { join } from "path";
import Directive from "./directive";

describe("generate directive structure", () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => Directive.parse([]));
    });

    it("should create directory with directive name in current directory", () => {
        assert.equal(Directive.from(["hello"]).folder_path, join(__dirname, "hello"));
    });

    it("should set proper name if it ends with .js", () => {
        let impl = Directive.from([join("../test", "zxc.js"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.directive.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "zxc.directive.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = Directive.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.directive.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "zxc.directive.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });

    it("should set proper name for dynamic version directive", () => {
        let impl = Directive.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.directive.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "zxc.directive.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = Directive.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.directive.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc/xyz", "xyz.directive.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc/xyz"));
    });

    it("should set proper name for dynamic version directive relative", () => {
        let impl = Directive.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.directive.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc/xyz", "xyz.directive.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc/xyz"));
    });
});
