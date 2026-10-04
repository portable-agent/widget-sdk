import cardSchema from '../contracts/action-confirmation.schema.json' with { type: 'json' };
import { CardError } from './card-error.js';
import type { ActionConfirmationWidget } from './generated/action-confirmation.js';
import { makeParser } from './schema-check.js';

export type Decision = 'CONFIRM' | 'CANCEL';

export interface DecisionCommand {
    actionId: string;
    decision: Decision;
    payloadHash: string;
}

export const parseCard = makeParser<ActionConfirmationWidget>(cardSchema, (issues) => new CardError(issues));

export function makeDecision(card: ActionConfirmationWidget, decision: Decision): DecisionCommand {
    const buttonId = decision === 'CONFIRM' ? 'confirm' : 'cancel';
    const buttonExists = card.actions.some((action) => action.id === buttonId);

    if (!buttonExists) {
        throw new CardError([`/${buttonId}: action is not available`]);
    }

    return {
        actionId: card.actionId,
        decision,
        payloadHash: card.payloadHash,
    };
}
