import Block from '../../../core/Block';
import './errorpage.scss';

interface ErrorProps {
  code: string;
  text: string;
}

export class ErrorPage extends Block {
  public static componentName = 'ErrorPage';

  constructor({code, text}: ErrorProps) {
    super({code, text});
  }

  render() {
    return `
    <div class="centered-block__wrapper accent-bg">
        <div class="centered-block__content">
            <h1>{{ code }}</h1>
            <h2>{{ text }}</h2>
            <p class="back-link">
            {{{Link
              text="Назад к чатам"
              to="/chat"
            }}}
            </p>
        <div class="centered-block">
    </div>
    `;
  }
}