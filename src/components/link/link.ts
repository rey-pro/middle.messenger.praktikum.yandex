import { Router, Block }  from '../../core';

interface LinkProps {
  class?: string;
  text: string;
  to: string;
}

export class Link extends Block {
  public static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      const router = new Router();
      router.go(this.props.to as string);

      e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `<p><a href="{{to}}" {{#if class}}class="{{class}}"{{/if}}>{{text}}</a></p>`;
  }
}