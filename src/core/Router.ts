import Route from "./Route";

export class Router {
    private static __instance: Router;
    protected routes!: Array<Route>;
    protected history!: History;
    protected _currentRoute!: Route | null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;

        Router.__instance = this;
    }

    use(pathname: string, block: any, props: P) {
        const route = new Route(pathname, block, props);

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: any)  => {
           this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({name: pathname}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        const route = this.routes.find(route => route.match(pathname));
        return route || this.routes.find(route => route.match('*'));
    }

    getHistoryLength(){
        return this.history.length;
    }
}