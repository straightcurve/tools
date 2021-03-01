import { assert } from "chai";
import chalk from "chalk";
import { get_selector, get_template_name } from "../src/utils";

describe(`${chalk.blue("ngjs")}: utils`, () => {
    it("should return proper template name", () => {
        assert.equal(get_template_name("business"), "Business");
        assert.equal(get_template_name("business-dashboard"), "BusinessDashboard");
        assert.equal(get_template_name("BusinessDashboard"), "BusinessDashboard");
        assert.equal(get_template_name("Business-Dashboard"), "BusinessDashboard");
        assert.equal(get_template_name("B$u#S@i!Ne^S&S-DaSHbOarD"), "BusinessDashboard");
    });

    it("should return proper selector", () => {
        assert.equal(get_selector("business-dashboard"), "business-dashboard");
        assert.equal(get_selector("BuSiNeSS-DaSHbOarD"), "business-dashboard");
        assert.equal(get_selector("B$u#S@i!Ne^S&S-DaSHbOarD"), "business-dashboard");
    });
});
