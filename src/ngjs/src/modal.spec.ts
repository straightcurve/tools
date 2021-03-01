import { assert } from "chai";
import chalk from "chalk";
import { join } from "path";
import { cwd } from "process";
import Modal from "./modal";

describe(`${chalk.blue("ngjs")}: generate modal structure`, () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => Modal.parse([]));
    });

    it("should create directory with modal name in current directory", () => {
        assert.equal(Modal.from(["hello"]).folder_path, join(cwd(), "hello"));
    });

    it("should return absolute html path", () => {
        assert.equal(Modal.from(["hello"]).html_path, join(cwd(), "hello", "hello.html"));
    });

    it("should return relative to `public` directory html path", () => {
        assert.equal(Modal.from(["../test/public/hello"]).html_path, join("hello", "hello.html"));
    });

    it("should set proper name if it ends with .js", () => {
        let impl = Modal.from([join("../test", "zxc.js"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.modal.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "zxc.modal.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = Modal.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.modal.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "zxc.modal.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name for dynamic version modal", () => {
        let impl = Modal.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.modal.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "zxc.modal.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = Modal.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.modal.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc/xyz", "xyz.modal.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc/xyz"));
    });

    it("should set proper name for dynamic version modal relative", () => {
        let impl = Modal.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.modal.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc/xyz", "xyz.modal.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc/xyz"));
    });
});
