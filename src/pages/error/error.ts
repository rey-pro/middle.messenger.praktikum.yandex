import Block from '../../core/Block';
import './error.less';
export interface SignInProps {}
interface ErrorProps {
    code: number
    detail: string
}

export class Error extends Block {
    constructor({code, detail}:ErrorProps) {
        super();
        let state = {
            code: code,
            detail: detail
        }
        this.setState(state)
    }

    render() {
        const {code, detail} = this.state;
        // language=hbs
        return `
            <main class="error">
                <div class="error__container">
                    <div class="error__text-container">
                        <h6 class="error__title">${code}</h6>
                        <p class="error__subtitle">${detail}</p>
                    </div>
                    <a class="error__button" href="/">Back to chats</a>
                </div>
            </main>
        `;
    }
}