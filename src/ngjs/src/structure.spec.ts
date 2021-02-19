import { assert } from "chai";
import { to_camel_case } from "./structure";

describe("base structure", () => {
    it("should camelCase a string that contains dashes", () => {
        assert.equal(to_camel_case("course-discussion-topics"), "courseDiscussionTopics");
    });
});
