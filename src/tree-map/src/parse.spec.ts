import { assert } from "chai";
import parse from "./parse";

describe("tree-map: parse", () => {
    it("should return empty nodes array", () => {
        let nodes = parse("./src/tree-map/test/no-children");

        assert.equal(nodes[0].nodes.length, 0);
    });

    it("should ignore self references", () => {
        let nodes = parse("./src/tree-map/test/self-ref");

        assert.equal(nodes[0].nodes.length, 0);
    });

    it("should ignore dynamic templates", () => {
        let nodes = parse("./src/tree-map/test/dynamic");

        assert.equal(nodes[0].nodes.length, 0);
    });

    it("should return node with ng-include as attribute", () => {
        let nodes = parse("./src/tree-map/test/attribute");

        assert.equal(nodes.length, 1);
        assert.equal(nodes[0].nodes.length, 1);
    });
});
