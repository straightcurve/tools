import { assert } from "chai";
import { join } from "path";
import generate from "./generate";

describe("generate command", () => {
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
});
