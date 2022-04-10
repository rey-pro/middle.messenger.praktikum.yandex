interface typeConfig  {
    required?: boolean;
    min?: number;
    max?: number;
    login?: string;
    password?: string;
}

const config: Record<string, typeConfig> = {
    login: {
        "required": true,
        "min": 3,
        "max": 20,
        //language=regexp
        "login": '^[a-zA-Z0-9_-]*[a-zA-Z]+[a-zA-Z0-9_-]*$'
    },
    password: {
        "required": true,
        "min": 8,
        "max": 40,
        //language=regexp
        "password": '[A-Z]+[0-9]+'
    }
}

export default config;