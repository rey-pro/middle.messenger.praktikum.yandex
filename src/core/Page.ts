import Block from "./Block";

export default class Page extends Block {
  public forAuthorized = false;

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
}