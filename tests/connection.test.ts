import { describe, expect, it } from 'vitest';
import { parseConnection, WidgetError } from '../src/index.js';

const validConnection = {
    schemaVersion: 1,
    widget: 'connection',
    provider: 'google-calendar',
    title: 'Подключить Google Calendar',
    text: 'Подключите календарь и повторите команду.',
    button: {
        label: 'Подключить',
        url: 'https://accounts.google.com/oauth',
    },
};

describe('parseConnection', () => {
    it('returns a typed channel-neutral widget', () => {
        expect(parseConnection(validConnection)).toEqual(validConnection);
    });

    it('rejects an unsafe URL', () => {
        expect(() =>
            parseConnection({
                ...validConnection,
                button: { ...validConnection.button, url: 'http://unsafe.example/oauth' },
            }),
        ).toThrow(WidgetError);
    });

    it('does not expose private input in an error', () => {
        expect(() => parseConnection({ ...validConnection, state: 'private-state' })).toThrow(WidgetError);
        expect(() => parseConnection({ ...validConnection, state: 'private-state' })).not.toThrow(/private-state/);
    });
});
