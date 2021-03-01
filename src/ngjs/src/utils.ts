/**
 * @returns `course-discussion-topics` => `Course-discussion-topics`
 */
export function capitalize(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

/**
 * TODO: Use regex
 * @param str
 */
export function filter_special_characters(str: string) {
    const special = ["$", "@", "!", "#", "%", "^", "&", "*", "(", ")"];
    let i = 0;
    let len = str.length;
    let result = "";

    while (i < len) {
        if (special.indexOf(str.charAt(i)) === -1) result += str.charAt(i);
        i++;
    }

    return result;
}

/**
 * @returns `course-discussion-topics` => `courseDiscussionTopics`
 */
function to_camel_case(str: string): string {
    let split = str.split("-");
    return (
        split[0] +
        split
            .slice(1)
            .map((s) => {
                return `${s[0].toUpperCase()}${s.slice(1)}`;
            })
            .join("")
    );
}

export function get_template_name(name: string) {
    if (name.indexOf("-") !== -1) name = name.toLowerCase();

    return `${capitalize(filter_special_characters(to_camel_case(name)))}`;
}

export function get_selector(name: string) {
    return `${filter_special_characters(name.toLowerCase())}`;
}
