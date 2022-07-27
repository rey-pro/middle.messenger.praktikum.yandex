import { Block, Store } from '../core';
import { isEqual } from './helpers';

export function withStore(Component: typeof Block) {
  return class extends Component {
    public static componentName = Component.name;

    constructor(props: P & { store: Store<AppState> }) {
      super({ ...props, store: window.store});
    }

    componentDidMount(props: P & { store: Store<AppState> }) {
      super.componentDidMount(props);

      this.setState({
        store: window.store.getState(),
      });
      
      window.store.on('changed', (prevState, nextState) => {
        if ( !isEqual(prevState, nextState) ) {
          this.setState({
            store: window.store.getState(),
          });
        }
      });
    }
  };
}