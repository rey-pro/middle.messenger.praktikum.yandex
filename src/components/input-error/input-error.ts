import Block from '../../core/Block';

export interface ErrorProps {
    text?: string
}

export class InputError extends Block {

    protected render(): string {
        // language=hbs
        return `
            <div class="input-err {{#if text}} show {{/if}}">{{#if text}}{{text}}{{/if}}</div>
        `
    }
}
