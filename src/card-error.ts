import { WidgetError } from './widget-error.js';

export class CardError extends WidgetError {
    constructor(issues: readonly string[]) {
        super(issues);
        this.name = 'CardError';
    }
}
