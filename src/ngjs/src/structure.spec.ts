import { assert } from "chai";
import { to_angular_js_identifier, to_camel_case } from "./structure";
import { capitalize } from "./utils";

describe("base structure", () => {
    it("should capitalize a string", () => {
        assert.equal(
            capitalize("course-discussion-topics"),
            "Course-discussion-topics"
        );
    });

    it("should camelCase a string that contains dashes", () => {
        assert.equal(
            to_camel_case("course-discussion-topics"),
            "courseDiscussionTopics"
        );
    });

    it("should return camelCased path relative to public folder", () => {
        assert.equal(
            to_angular_js_identifier(
                "/public/communities/announcements/new",
                "new"
            ),
            "communitiesAnnouncementsNew"
        );
    });

    it("should return camelCased path from folder_path to 1 folder up", () => {
        assert.equal(
            to_angular_js_identifier("/communities/announcements/new", "new"),
            "announcementsNew"
        );
    });
});
