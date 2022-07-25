const findUser = (id: number): User | null  => {
  const users = window.store.getState().currentChat?.users;
  let result = users?.filter((user) => user.id === id);

  return (result && result[0]) ? result[0] : null;
}


export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    lastName: data.second_name,
    displayName: ( data.id === window.store.getState().user?.id ) ? 'Вы' : data.display_name ? data.display_name : data.first_name,
    avatar: data.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : `/static/images/no-photo.png`,
    phone: data.phone ? data.phone : '',
    email: data.email,
    you: data.id === window.store.getState().user?.id 
  };
};

export const transformMessage = (data: MessageDTO): Message => {
  return {
    author: ( data.user ) ? transformUser(data.user) : findUser( data.user_id as number ),
    text: data.content,
    created: new Date(data.time).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' }),
    you: ( data.user_id ) ? data.user_id === window.store.getState().user?.id : false,
    isRead: data.is_read
  };
};

export const transformChat = (data: ChatDTO): Chat => {
  return {
    id: data.id,
    ref: `item${data.id}`, 
    name: data.title,
    active: false,
    avatar: data.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : `/static/images/no-photo.png`,
    lastMessage: ( data.last_message ) ? transformMessage(data.last_message) : null
  };
};