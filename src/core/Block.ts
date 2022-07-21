import EventBus from './EventBus';
import { nanoid } from 'nanoid'
import Handlebars from 'handlebars';

interface BlockMeta{
  props: P;
}

type Events = Values<typeof Block.EVENTS>;

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);
  public rName = '';
  private readonly _meta: BlockMeta;

  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: {[id: string]: Block} = {};

  eventBus: () => EventBus<Events>;

  protected state: P = {};
  protected refs: {[key: string]: HTMLElement} = {};

  public static componentName?: string;
  public forAuthorized = false; 

  public constructor(props: P = {}) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props,
    };

    this.getStateFromProps(props);

    this.props = this._makePropsProxy(props || {});
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
  
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

 
  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  protected getStateFromProps(props: P): void {
    this.state = props;
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {
    //todo
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    if ( this.forAuthorized ){
      const store: any = this.state.store;

      if ( store && store.isLoading && !store.user ) {
        window.router.go('/login');
        return false;
      }
    }
      
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: P) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild;

    if (newElement !== null && this._element !== null){
      this._element.replaceWith(newElement);
    }  

    this._element = newElement as HTMLElement;

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !==  Node.DOCUMENT_FRAGMENT_NODE ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100)
    }

    return this.element;
  }

  _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target: P, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: P, prop: string, value: unknown) {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as P).events as Record<string, () => void>;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element !== null) {
        this._element.removeEventListener(event, listener);
      }  
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as P).events as Record<string, () => void>;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element !== null) {
        this._element.addEventListener(event, listener);
      }  
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }
      
      const newContent = component.getContent();
      if (newContent !== null) {
        stub.replaceWith(newContent);
      }   
    });

    return fragment.content;
  }

  updateChild(child: Block, nextState: P){
    child.setState(nextState);
    
    const newContent = child.getContent();

    if (newContent !== null) {
      this.refs[child.rName] = newContent;
    }  
  }

  updateComponentChild(nextState: P){
    for(const id in this.children){
      const child = this.children[id];
      this.updateChild(child, nextState)
    }
  }

  hide() {
    (this.element as HTMLElement).remove()
  }
}