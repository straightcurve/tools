/**
 * @summary
 * if you want to change this, you don't
 * know what you're doing. so don't?
 */
function bootstrap_component(component: {
    bindings: any;
    controller: any;
    templateUrl: string;
    controllerAs: string;
}) {
    return {
        restrict: "E",
        replace: true,
        bindToController: true,

        scope: component.bindings,
        controller: component.controller,
        controllerAs: component.controllerAs,
        templateUrl: component.templateUrl,
    };
}

/**
 * @summary
 * if you want to change this, you don't
 * know what you're doing. so don't?
 */
function bootstrap_directive(directive: { link: any }) {
    return {
        restrict: "A",
        scope: false,
        link: directive.link,
    };
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
