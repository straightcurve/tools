import { assert } from "chai";
import { join } from "path";
import generate from "./generate";

describe("generate template", () => {
    it("should throw if arguments < 2", () => {
        assert.throws(() => generate([]));
        assert.throws(() => generate(["c"]));
    });

    it("should throw if type not supported", () => {
        assert.throws(() => generate(["z", "asd" ]));
    });

    it("should throw if absolute path", () => {
        assert.throws(() => generate(["c", join(__dirname, "asd") ]));
    });

    it("should set proper name/path/filename/folder_path for api", () => {
        let impl = generate(["a", join("../../test", "zxc"), "-v", "1"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.api.v1.js");
        assert.equal(impl.path, join(__dirname, "../../test", "zxc.api.v1.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test"));
    });

    it("should set proper name for dynamic version api", () => {
        let impl = generate(["a", join("../../test", "zxc"), "-v", "4"]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.api.v4.js");
        assert.equal(impl.path, join(__dirname, "../../test", "zxc.api.v4.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test"));
    });

    it("should set proper name/path/filename/folder_path for service", () => {
        let impl = generate(["s", join("../../test", "zxc") ]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.service.js");
        assert.equal(impl.path, join(__dirname, "../../test", "zxc.service.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test"));
    });

    it("should set proper name/path/filename/folder_path for controller", () => {
        let impl = generate(["c", join("../../test", "zxc") ]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.controller.js");
        assert.equal(impl.path, join(__dirname, "../../test", "zxc", "zxc.controller.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test", "zxc"));
    });

    it("should set proper name/path/filename/folder_path for data", () => {
        let impl = generate(["d", join("../../test", "zxc") ]);

        assert.equal(impl.name, "zxc");
        assert.equal(impl.filename, "zxc.js");
        assert.equal(impl.path, join(__dirname, "../../test", "data", "zxc.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test", "data"));
    });

    it("should set proper name/path/filename/folder_path for api relative", () => {
        let impl = generate(["a", join("../../test", "zxc/xyz"), "-v", "1"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.api.v1.js");
        assert.equal(impl.path, join(__dirname, "../../test/zxc", "xyz.api.v1.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test/zxc"));
    });

    it("should set proper name for dynamic version api relative", () => {
        let impl = generate(["a", join("../../test", "zxc/xyz"), "-v", "4"]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.api.v4.js");
        assert.equal(impl.path, join(__dirname, "../../test/zxc", "xyz.api.v4.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path for service relative", () => {
        let impl = generate(["s", join("../../test", "zxc/xyz") ]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.service.js");
        assert.equal(impl.path, join(__dirname, "../../test/zxc", "xyz.service.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test/zxc"));
    });

    it("should set proper name/path/filename/folder_path for controller relative", () => {
        let impl = generate(["c", join("../../test", "zxc/xyz") ]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.controller.js");
        assert.equal(impl.path, join(__dirname, "../../test", "zxc", "xyz", "xyz.controller.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test", "zxc", "xyz"));
    });

    it("should set proper name/path/filename/folder_path for data relative", () => {
        let impl = generate(["d", join("../../test", "zxc/xyz") ]);

        assert.equal(impl.name, "xyz");
        assert.equal(impl.filename, "xyz.js");
        assert.equal(impl.path, join(__dirname, "../../test", "zxc", "data", "xyz.js"));
        assert.equal(impl.folder_path, join(__dirname, "../../test", "zxc", "data"));
    });
});
