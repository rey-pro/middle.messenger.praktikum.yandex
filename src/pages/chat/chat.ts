import Block from '../../core/Block';
import './chat.less';

export interface ChatItem {
    name: string
    last: ChatMessage
    quantityOfUnread: number
}

export interface ChatMessage {
    message: string,
    date: string
}

export interface CurrentChatItem {
    name: string
    messages: Array<CurrentChatMessage>
}

export interface CurrentChatMessage {
    message: string,
    date: string
    isYour: boolean
    isRead: boolean
}

export class Chat extends Block {

    public getChatsData(): Array<ChatItem> {
        return [
            {
                name: 'Andrey',
                last: {
                    message: 'Hey',
                    date: '11:12'
                },
                quantityOfUnread: 3
            },
            {
                name: 'Alex',
                last: {
                    message: 'How are you',
                    date: '13:14'
                },
                quantityOfUnread: 2
            }
        ];
    }

    public getCurrentChatData(): CurrentChatItem {
        return {
            name: 'Marina',
            messages: [
                {isYour: true, message: 'How are you?', date: '13:14', isRead: true},
                {isYour: false, message: 'Great, thanks.', date: '14:15', isRead: false}
            ]
        };
    }


    render() {
        let chats = this.getChatsData();
        let currentChat = this.getCurrentChatData();
        // language=hbs
        return `
            ${(() => `
            `)}
            <main class="main">
                <div class="chat-container">
                    <div class="chat-list">
                        <div class="chat-search-bar">
                            <div class="chat-search-bar__container"><a class="chat-search-bar__profile-button"
                                                                       href="/profile.html">Profile
                                &gt;</a></div>
                            <div class="chat-search-bar__search-container">
                                <input class="chat-search-bar__input" placeholder="Search"></div>
                        </div>
                        ${
                            chats.map(chat => `
                            <div class="chat-list-item" >
                                <div class="chat-list-item__container">
                                    <div class="chat-list-item__message-container">
                                        <div class="chat-list-item__image"></div>
                                        <div class="chat-list-item__message-info">
                                            <p class="chat-list-item__user-name">
                                                ${chat.name}
                                            </p>
                                            <p class="chat-list-item__message">
                                                ${chat.last.message}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="chat-list-item__info-container">
                                        <p class="chat-list-item__message-date">
                                            ${chat.last.date}
                                        </p>
                                        <div class="chat-list-item__count-container">
                                            <p class="chat-list-item__count">
                                                ${chat.quantityOfUnread}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `
                            ).join('')
                        }
                    </div>
                    <div class="chat">
                        <div class="chat-active-user">
                            <div class="chat-active-user__container">
                                <div class="chat-active-user__image"></div>
                                <p class="chat-active-user__name">${currentChat.name}</p></div>
                            <div class="chat-active-user__edit-container"></div>
                            <button class="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="16" viewBox="0 0 3 16"
                                     fill="none">
                                    <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                                    <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                                    <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                                </svg>
                            </button>
                        </div>
                        <div class="chat-active">
                            ${currentChat.messages.map(item => this.renderChatItem(item)).join('')}
                        </div>
                        <form class="chat-message-form">
                            <div class="chat-message-form__container">
                                <button class="button">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M6.18661 12.5L13.7628 4.92389L14.7056 5.8667L7.12942 13.4428L6.18661 12.5Z"
                                              fill="#999999"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.70068 15.0141L16.2768 7.43793L17.2196 8.38074L9.64349 15.9569L8.70068 15.0141Z"
                                              fill="#999999"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M14.0433 20.3567L21.6194 12.7806L22.5623 13.7234L14.9861 21.2995L14.0433 20.3567Z"
                                              fill="#999999"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.5574 22.8708L24.1335 15.2946L25.0763 16.2374L17.5002 23.8136L16.5574 22.8708Z"
                                              fill="#999999"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.5575 22.8709C13.9423 25.486 9.71181 25.4954 7.10832 22.8919C4.50482 20.2884 4.51425 16.0579 7.12936 13.4428L6.18655 12.5C3.04841 15.6381 3.03711 20.7148 6.1613 23.839C9.2855 26.9632 14.3621 26.9518 17.5003 23.8137L16.5575 22.8709Z"
                                              fill="#999999"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M21.6195 12.7806L22.5623 13.7234C25.003 11.2826 25.0118 7.3341 22.5819 4.90417C20.152 2.47424 16.2035 2.48303 13.7627 4.92381L14.7055 5.86662C16.6233 3.94887 19.7257 3.94196 21.6349 5.85119C23.5441 7.76042 23.5372 10.8628 21.6195 12.7806Z"
                                              fill="#999999"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.70093 15.0144C6.95752 16.7578 6.95123 19.5782 8.6869 21.3138C10.4226 23.0495 13.2429 23.0432 14.9863 21.2998L14.0435 20.357C12.8231 21.5774 10.8489 21.5818 9.63392 20.3668C8.41895 19.1518 8.42335 17.1776 9.64374 15.9572L8.70093 15.0144Z"
                                              fill="#999999"></path>
                                    </svg>
                                </button>
                            </div>
                            <input class="chat-message-form__field" placeholder="Message" name="message" type="text">
                            <button class="button chat-message-form__send-button">→</button>
                        </form>
                    </div>
                </div>
            </main>
        `;
    }

    renderChatItem(chat: CurrentChatMessage) {
        if (chat.isYour) {
            return `
            <div class="chat-your-message">
                                        <p class="chat-your-message__text">${chat.message}</p>
                                        <div class="chat-your-message__info-container">
                                            ${this.renderIsRead(chat)}
                                            <p class="chat-your-message__info">${chat.date}</p>
                                        </div>
                                    </div>
            `
        } else {
            return `
                                    <div class="chat-his-message" >
                                        <div class="chat-his-message__container"><p class="chat-his-message__text">${chat.message}</p>
                                            <div class="chat-his-message__info-container">
                                                <p class="chat-his-message__info">${chat.date}</p>
                                            </div>
                                        </div>
                                    </div>
            `
        }
    }

    renderIsRead(chat: CurrentChatMessage) {
        if (chat.isRead) {
            return `
            <svg width="11" height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <line y1="-0.5" x2="3.765" y2="-0.5"
                                                          transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)"
                                                          stroke="#3369F3"></line>
                                                    <line y1="-0.5" x2="5.6475" y2="-0.5"
                                                          transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5)"
                                                          stroke="#3369F3"></line>
                                                    <line y1="-0.5" x2="5.6475" y2="-0.5"
                                                          transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)"
                                                          stroke="#3369F3"></line>
                                                </svg>
            `
        }
        return ``;
    }
}