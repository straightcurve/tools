"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var structure_1 = require("./structure");
describe("base structure", function () {
    it("should capitalize a string", function () {
        chai_1.assert.equal(structure_1.capitalize("course-discussion-topics"), "Course-discussion-topics");
    });
    it("should camelCase a string that contains dashes", function () {
        chai_1.assert.equal(structure_1.to_camel_case("course-discussion-topics"), "courseDiscussionTopics");
    });
    it("should return camelCased path relative to public folder", function () {
        chai_1.assert.equal(structure_1.to_angular_js_identifier("/public/communities/announcements/new", "new"), "communitiesAnnouncementsNew");
    });
    it("should return camelCased path from folder_path to 1 folder up", function () {
        chai_1.assert.equal(structure_1.to_angular_js_identifier("/communities/announcements/new", "new"), "announcementsNew");
    });
});
