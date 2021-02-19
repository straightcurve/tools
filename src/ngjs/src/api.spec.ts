import { assert } from "chai";
import { join } from "path";
import { cwd } from "process";
import API from "./api";

describe("generate api structure", () => {
    it("should throw if arguments < 1", () => {
        assert.throws(() => API.parse([]));
    });

    it("should create api in current directory", () => {
        assert.equal(API.from(["hello"]).folder_path, join(cwd()));
    });

    it("should set proper name if it ends with .js", () => {
        let impl = API.from([join("../test", "zxc.js"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.api.v1.js");
        assert.equal(impl.path, join(cwd(), "../test", "zxc.api.v1.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test"));
    });

    it("should set proper name/path/filename/folder_path", () => {
        let impl = API.from([join("../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.api.v1.js");
        assert.equal(impl.path, join(cwd(), "../test", "zxc.api.v1.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test"));
    });

    it("should set proper name for dynamic version api", () => {
        let impl = API.from([join("../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.api.v4.js");
        assert.equal(impl.path, join(cwd(), "../test", "zxc.api.v4.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test"));
    });

    it("should set proper name/path/filename/folder_path relative", () => {
        let impl = API.from([join("../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.api.v1.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "xyz.api.v1.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });

    it("should set proper name for dynamic version api relative", () => {
        let impl = API.from([join("../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.api.v4.js");
        assert.equal(impl.path, join(cwd(), "../test/zxc", "xyz.api.v4.js"));
        assert.equal(impl.folder_path, join(cwd(), "../test/zxc"));
    });
});
