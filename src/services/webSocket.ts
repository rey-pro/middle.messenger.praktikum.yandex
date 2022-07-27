import { transformMessage, isPing } from '../utils';

type SocketRequestData = {
    chatId: number;
    userId: number | undefined;
    token: string;
}

export class Socket{
    ws?: WebSocket;
    private ping?: number;
    private static __instance: Socket;

    constructor(){
        if (Socket.__instance) {
            return Socket.__instance;
        }

        Socket.__instance = this;
    }

    _startPing = () => {
        this.ping = setInterval(() => {
            this.ws?.send(
                JSON.stringify({
                    type: 'ping',
                }),
            )
        }, 10000);        
    }

    _stopPing = () => {
        clearInterval(this.ping);
    }

    _onOpen = () => {
        this._startPing();
        this.getMessages();
    }

    _onClose = (event: CloseEvent) => {
        this._stopPing();
    }

    _onMessage = (event: MessageEvent) => {
        const response = JSON.parse(event.data);

        if ( !isPing(response) ) {
            const messages: Array<Message> = window.store.getState().messages;

            if ( response instanceof Array ) {
                (response as Array<MessageDTO>).forEach((value) => {
                    messages.push(transformMessage(value));
                });
            } else {
                messages.push(transformMessage(response));
            }   

             window.store.set({messages: messages});
        }
    }

    _addEvents() {
        this.ws?.addEventListener('open', this._onOpen);
      
        this.ws?.addEventListener('close', this._onClose);
      
        this.ws?.addEventListener('message', this._onMessage);
    }

    _removeEvents() {
        this.ws?.removeEventListener('open', this._onOpen);

        this.ws?.removeEventListener('close', this._onClose);
      
        this.ws?.removeEventListener('message', this._onMessage);
    }

    async connect(request: SocketRequestData) {
        await this.leave();

        this.ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${request.userId}/${request.chatId}/${request.token}`);
        
        this._addEvents();
    }

    async leave(){
        this.ws?.close();
        this._stopPing();
        this._removeEvents();
    }

    getMessages(content = 0) {
        this.ws?.send(
            JSON.stringify({
              content: `${content}`,
              type: 'get old',
            }),
        );
    }

    sendMessage( content: string ) {
        this.ws?.send(JSON.stringify({
            content: content,
            type: 'message',
        }));
    }
}

export default new Socket();
