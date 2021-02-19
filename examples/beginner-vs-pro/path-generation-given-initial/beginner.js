/**
 * @description 
 * Usually beginners don't add docs or they add too much, I kept
 * it `borderline` pro here.
 * 
 * Notice since beginners use JS they can miss the fact that
 * the `join` function from the `node:path` module is not even
 * imported and they can only find that out at runtime.
 * 
 * Also you can see the bad reasoning causes overly complex code.
 * 
 * Beginners like using the `else` keyword everywhere, for some reason.
 * 
 * Check out how pros handle the `else` keyword "problem".
 * 
 * @summary 
 * Returns the absolute path to the html file in the same directory 
 * with the provided `name` or returns the relative path starting from
 * the `public` directory.
 * @param {string} dir - absolute path to folder
 * @param {string} name - filename without extension
 * @returns {string} `/root/hello` => `/root/hello/hello.html`
 * @returns {string} `/root/public/hello` => `hello/hello.html`
 */
function get_html_path(dir, name) {
    if (dir.includes("/public/")) {
        let split = dir.split("/");
        let folder_path = split.slice(split.indexOf("public") + 1, split.length - 1).join("/");
        return join(folder_path, `${name}.html`);
    } else {
        return join(dir, `${name}.html`);
    }
}
