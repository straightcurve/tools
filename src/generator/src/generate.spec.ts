import { assert } from "chai";
import { join } from "path";
import generate from "../src/generate";
import rec_scan_files from "../src/rec_scan_files";

describe("generate a single script", () => {
    it("should throw if relative path", () => {
        assert.throws(() => generate("./scan.ts"));
    });

    it("should set proper path", () => {
        let path = join(__dirname, "../", "test", "modules");
        let module = rec_scan_files(path, (f) => f.endsWith(".module.js"))[0];

        assert.equal(generate(module).path, module);
    });

    it("should set proper filename", () => {
        let path = join(__dirname, "../", "test", "modules");
        let module = rec_scan_files(path, (f) => f.endsWith(".module.js"))[0];

        assert.equal(generate(module).filename, "asd.module.js");
    });

    it("should set proper extension", () => {
        let path = join(__dirname, "../", "test", "modules");
        let module = rec_scan_files(path, (f) => f.endsWith(".module.js"))[0];

        assert.equal(generate(module).extension, "js");
    });

    it("should set proper name", () => {
        let path = join(__dirname, "../", "test", "modules");
        let module = rec_scan_files(path, (f) => f.endsWith(".module.js"))[0];

        assert.equal(generate(module).name, "asd");
    });
});
