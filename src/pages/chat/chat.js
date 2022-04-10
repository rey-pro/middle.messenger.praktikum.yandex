import Handelbars from 'handlebars';
import template from './chat.tpl';

document.addEventListener('DOMContentLoaded', () => {
    const compiled = Handelbars.compile(template);
    const html = compiled({
        chats: [
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
        ],
        currentChat: {
            name: 'Marina',
            messages: [
                {isYour: true, message: 'How are you?', date: '13:14', isRead: true},
                {isYour: false, message: 'Great, thanks.', date: '14:15'}
            ]
        }
    });
    window.compiled = compiled;
    document.body.innerHTML = html;
});