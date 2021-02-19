import { assert } from "chai";
import { join } from "path";
import { cwd } from "process";
import Component from "./component";

describe("generate component structure", () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => Component.parse([]));
    });

    it("should create directory with component name in current directory", () => {
        assert.equal(Component.from(["hello"]).folder_path, join(cwd(), "hello"));
    });

    it("should return absolute html path", () => {
        assert.equal(Component.from(["hello"]).html_path, join(cwd(), "hello", "hello.html"));
    });

    it("should return relative to `public` directory html path", () => {
        assert.equal(Component.from(["../test/public/hello"]).html_path, join("hello", "hello.html"));
    });

    it("should set proper name if it ends with .js", () => {
        let impl = Component.from([join("../test", "zxc.js"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.component.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "zxc.component.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = Component.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.component.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "zxc.component.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name for dynamic version component", () => {
        let impl = Component.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.component.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "zxc.component.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = Component.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.component.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc/xyz", "xyz.component.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc/xyz"));
    });

    it("should set proper name for dynamic version component relative", () => {
        let impl = Component.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.component.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc/xyz", "xyz.component.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc/xyz"));
    });
});
