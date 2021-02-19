import { assert } from "chai";
import { join } from "path";
import { cwd } from "process";
import Service from "./service";

describe("generate service structure", () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => Service.parse([]));
    });

    it("should create service in current directory", () => {
        assert.equal(Service.from(["hello"]).folder_path, join(cwd()));
    });

    it("should set proper name if it ends with .js", () => {
        let impl = Service.from([join("../test", "zxc.js"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.service.js");
        assert.equal(impl.path, join(cwd(), "../test", "zxc.service.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = Service.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.service.js");
        assert.equal(impl.path, join(cwd(), "../test", "zxc.service.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test"));
    });

    it("should set proper name for dynamic version service", () => {
        let impl = Service.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.service.js");
        assert.equal(impl.path, join(cwd(), "../test", "zxc.service.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = Service.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.service.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "xyz.service.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name for dynamic version service relative", () => {
        let impl = Service.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.service.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "xyz.service.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });
});
