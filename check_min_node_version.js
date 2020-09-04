#!/usr/bin/env node

const v = process.version.split(".")[0];
const version = Number.parseInt(v.slice(1, v.length));

module.exports = {
    isAtLeastVersion: (expected) => {
        if(!expected && typeof expected !== "number")
            throw new Error(`Null parameter exception: expected`);

        return version >= expected;
    },
};
