import { assert } from "chai";
import chalk from "chalk";
import APITemplate from "../../src/templates/api";

describe(`${chalk.blue("ngjs")}: generate api template`, () => {
    it("should return proper name", () => {
        assert.equal(APITemplate.get_name("business", 4), "BusinessAPIv4");
        assert.equal(APITemplate.get_name("business-dashboard", 5), "BusinessDashboardAPIv5");
        assert.equal(APITemplate.get_name("BusinessDashboard", 12), "BusinessDashboardAPIv12");
        assert.equal(APITemplate.get_name("Business-Dashboard", 3), "BusinessDashboardAPIv3");
        assert.equal(APITemplate.get_name("B$u#S@i!Ne^S&S-DaSHbOarD", 6), "BusinessDashboardAPIv6");
    });
});
