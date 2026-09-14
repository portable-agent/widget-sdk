import { describe, expect, it } from 'vitest';
import { CardError, makeDecision, parseCard } from '../src/index.js';

const validCard = {
    schemaVersion: 1,
    widget: 'action_confirmation',
    actionId: '6c92fa39-4c85-4dc4-9661-018e1602de2f',
    payloadHash: 'a'.repeat(64),
    title: 'Создать встречу',
    fields: [
        { label: 'Когда', value: '29 августа, 14:00' },
        { label: 'Участник', value: 'Коля', sensitive: true },
    ],
    actions: [
        { id: 'confirm', label: 'Подтвердить' },
        { id: 'cancel', label: 'Отменить' },
    ],
};

describe('parseCard', () => {
    it('parseCard_withValidCard_returnsTypedCard', () => {
        const card = parseCard(validCard);

        expect(card.actionId).toBe(validCard.actionId);
        expect(card.fields).toHaveLength(2);
    });

    it('parseCard_withChangedHash_throwsSafeError', () => {
        const input = { ...validCard, payloadHash: 'unsafe-secret-value' };

        expect(() => parseCard(input)).toThrow(CardError);
        expect(() => parseCard(input)).not.toThrow(/unsafe-secret-value/);
    });

    it('parseCard_withExtraField_rejectsUnknownData', () => {
        expect(() => parseCard({ ...validCard, runNow: true })).toThrow(CardError);
    });

    it('parseCard_withEmptyInput_reportsRootError', () => {
        try {
            parseCard(null);
            expect.fail('parseCard must reject null');
        } catch (error) {
            expect(error).toBeInstanceOf(CardError);
            expect((error as CardError).issues[0]).toMatch(/^\//);
        }
    });
});

describe('makeDecision', () => {
    it('makeDecision_withConfirm_returnsActionCommand', () => {
        const card = parseCard(validCard);

        expect(makeDecision(card, 'CONFIRM')).toEqual({
            actionId: validCard.actionId,
            decision: 'CONFIRM',
            payloadHash: validCard.payloadHash,
        });
    });

    it('makeDecision_whenButtonIsMissing_throwsSafeError', () => {
        const card = parseCard({
            ...validCard,
            actions: [
                { id: 'confirm', label: 'Подтвердить' },
                { id: 'confirm', label: 'Да' },
            ],
        });

        expect(() => makeDecision(card, 'CANCEL')).toThrow(CardError);
    });
});
