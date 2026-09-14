export class CardError extends Error {
    readonly issues: readonly string[];

    constructor(issues: readonly string[]) {
        super('Card does not match the public contract');
        this.name = 'CardError';
        this.issues = issues;
    }
}
