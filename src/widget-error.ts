export class WidgetError extends Error {
    readonly issues: readonly string[];

    constructor(issues: readonly string[]) {
        super('Widget does not match the public contract');
        this.name = 'WidgetError';
        this.issues = issues;
    }
}
