import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import type { AnySchema } from 'ajv';

export function makeParser<T>(
    schema: AnySchema,
    makeError: (issues: readonly string[]) => Error,
): (value: unknown) => T {
    const ajv = new Ajv2020({ allErrors: true });
    addFormats(ajv);
    const check = ajv.compile<T>(schema);

    return (value: unknown): T => {
        if (check(value)) {
            return value as T;
        }

        const issues = (check.errors ?? []).map((error) => {
            const path = error.instancePath === '' ? '/' : error.instancePath;
            return `${path}: ${error.message}`;
        });
        throw makeError(issues);
    };
}
