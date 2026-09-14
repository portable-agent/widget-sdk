import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import cardSchema from '../contracts/action-confirmation.schema.json' with { type: 'json' };
import { CardError } from './card-error.js';
import type { ActionConfirmationWidget } from './generated/action-confirmation.js';

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const checkCard = ajv.compile<ActionConfirmationWidget>(cardSchema);

export type Decision = 'CONFIRM' | 'CANCEL';

export interface DecisionCommand {
    actionId: string;
    decision: Decision;
    payloadHash: string;
}

export function parseCard(value: unknown): ActionConfirmationWidget {
    if (checkCard(value)) {
        return value;
    }

    const issues = (checkCard.errors ?? []).map((error) => {
        const path = error.instancePath === '' ? '/' : error.instancePath;
        return `${path}: ${error.message}`;
    });
    throw new CardError(issues);
}

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
