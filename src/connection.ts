import connectionSchema from '../contracts/connection-widget.schema.json' with { type: 'json' };
import type { ExternalAccountConnectionWidget } from './generated/connection-widget.js';
import { makeParser } from './schema-check.js';
import { WidgetError } from './widget-error.js';

export const parseConnection = makeParser<ExternalAccountConnectionWidget>(
    connectionSchema,
    (issues) => new WidgetError(issues),
);
