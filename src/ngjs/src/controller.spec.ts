import { assert } from "chai";
import { join } from "path";
import Controller from "./controller";

describe("generate controller structure", () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => Controller.parse([]));
    });

    it("should set proper name if it ends with .js", () => {
        let impl = Controller.from([join("../test", "zxc.js"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.controller.js");
        assert.equal(impl.path, join(__dirname, "../test", "zxc.controller.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = Controller.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.controller.js");
        assert.equal(impl.path, join(__dirname, "../test", "zxc.controller.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test"));
    });

    it("should set proper name for dynamic version controller", () => {
        let impl = Controller.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.controller.js");
        assert.equal(impl.path, join(__dirname, "../test", "zxc.controller.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = Controller.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.controller.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "xyz.controller.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });

    it("should set proper name for dynamic version controller relative", () => {
        let impl = Controller.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.controller.js");
        assert.equal(impl.path, join(__dirname, "../test/zxc", "xyz.controller.js"));
        assert.equal(impl.folder_path, join(__dirname, "../test/zxc"));
    });
});
