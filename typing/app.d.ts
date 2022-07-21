declare global {
    export type Nullable<T> = T | null;
  
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type P = Record<string, unknown> | Record<string, () => void>;

    export type Indexed = { [key: string]: any };

    export type AppState = {
      isLoading: boolean;
      formError: string | null;
      formSuccess: string | null;
      user: User | null;
      chats: Array<Chat> | null;
      currentChat: Chat | null;
      messages: Array<Message>; 
    };
  
    export type Chat = {
      id: number;
      ref: string;
      name: string;
      active: boolean;
      avatar: string;
      users?: Array<User> | null;
      lastMessage: Message | null;
    };

    export type Message = {
      author: User | null;
      text: string;
      created: string;
      you?: boolean;
      isRead?: boolean; 
    };

    export type User = {
      id?: number;
      login?: string;
      firstName?: string;
      lastName?: string;
      displayName?: string;
      email?: string;
      avatar?: string;
      phone?: string; 
      you?: boolean;
    };
 
    export type APIError = {
      reason: string;
    };
    
    export type ResponseData = Record<string, unknown> | Array<ChatDTO> |  APIError;

    export type UserDTO = {
      id?: number;
      login: string;
      first_name: string;
      second_name: string;
      display_name?: string;
      email: string;
      avatar: string;
      phone: string;
      you?: boolean
    };

    export type MessageDTO = {
      user: UserDTO;
      time: string;
      content: string;
      user_id?: number;
      is_read?: boolean;
      you?: boolean;
    };

    export type ChatDTO = {
      id: number;
      title: string;
      avatar: string;
      unread_count: number;
      last_message: MessageDTO
    };
  }

  export {}