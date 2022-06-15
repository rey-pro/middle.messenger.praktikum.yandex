export class Validator {
    [prop: string]: any;

    protected defaultMessages: Record<string, string> = {
        required: 'field is required',
        min: 'This field must contain at least %%value%% characters',
        max: 'This field must contain no more than %%value%% characters',
        login: 'Latin, can contain numbers, but not consist of them, no spaces, no special characters (hyphens and underscores are allowed)',
        password: 'At least one capital letter and number required',
    };

    protected getDefaultMessage(ruleName: string) {
        return this.defaultMessages[ruleName] ?? '';
    }

    public validateField(field: string, value: string): string {
        const functionName = '_validate' + Validator.capitalizeFirstLetter(field);
        let error = '';
        if(typeof this[functionName] !== 'undefined') {
            return this[functionName](value)
        }

        return error;
    }

    private static capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    protected _validatePassword(value: string): string {
        let error = '';

        error = this._required(value);
        if(error) {
            return error;
        }

        error = this._min(value, 8);
        if(error) {
            return error;
        }

        error = this._max(value, 40);
        if(error) {
            return error;
        }

        error = this._password(value);
        if(error) {
            return error;
        }

        return '';
    }

    protected _validateLogin(value: string): string {
        let error = '';

        error = this._required(value);
        if(error) {
            return error;
        }

        error = this._min(value, 3);
        if(error) {
            return error;
        }

        error = this._max(value, 20);
        if(error) {
            return error;
        }

        error = this._login(value);
        if(error) {
            return error;
        }

        return '';
    }

    message(ruleName: string, ruleValue: any) {
        return this.getDefaultMessage(ruleName).replace('%%value%%', ruleValue);
    }

    protected _required(value: Nullable<string>) {
        if(value === '') {
            return this.message('required', '');
        }
        return '';
    }

    protected _min(value: string, ruleValue: number) {
        if(value.length < ruleValue) {
            return this.message('min', ruleValue);
        }
        return '';
    }

    protected _max(value: string, ruleValue: number) {
        if(value.length > ruleValue) {
            return this.message('max', ruleValue);
        }
        return '';
    }

    protected _login(value: string) {
        //Only allowed symbols
        if(!(new RegExp('^[a-zA-Z0-9_-]*$')).test(value)) {
            return this.message('login', '');
        }
        //Disallow numbers only
        if((new RegExp('^[0-9]+$')).test(value)) {
            return this.message('login', '');
        }

        return '';
    }

    protected _password(value: string) {
        if(!(new RegExp('[A-ZА-Я]')).test(value)) {
            return this.message('password', '');
        }
        if(!(new RegExp('[0-9]')).test(value)) {
            return this.message('password', '');
        }
        return '';
    }
}