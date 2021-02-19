//@ts-check
import { join } from "path";

/**
 * @description
 * Notice that even when pros use JS, they add the `@ts-check` directive
 * at the top to ensure they find possible issues at compile time.
 * 
 * The double `@returns` decorator used by the beginner actually causes
 * an error here and so we removed one of them. 
 * 
 * You can see that by adding a proper condition to the `if` statement,
 * pros can omit using the `else` keyword which makes the code much more
 * easier to follow, since there are clear `return` points defined.
 * 
 * The problem has been approached from a different kind of view here.
 * Instead of thinking of a collection of folder names, you can think
 * of what actually needs to be accomplished: in the case of `@dir`
 * not being a child of `/public`, concatenate the strings; otherwise
 * slice off everything before `/public/` (inclusive) and then concatenate
 * the result and the `@name`.
 * 
 * @summary 
 * Returns the absolute path to the html file in the same directory 
 * with the provided `name` or returns the relative path starting from
 * the `public` directory.
 * @param {string} dir - absolute path to folder
 * @param {string} name - filename without extension
 * @returns {string} `/root/hello` => `/root/hello/@name.html` or `/root/public/hello` => `hello/@name.html`
 */
function get_html_path(dir, name) {
    const _public = "/public/"; 

    if (!dir.includes(_public))
        return join(dir, `${name}.html`);

    return join(dir.slice(dir.indexOf(_public) + _public.length), `${name}.html`);
}
