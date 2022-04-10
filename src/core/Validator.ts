import validateOptions from '../config/validate.cfg'

interface typeConfig {
    required?: boolean;
    min?: number;
    max?: number;
    latin?: boolean;
}

export class Validator {

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

    protected getValidateOptions(field: string): typeConfig {
        if (typeof validateOptions[field] !== "undefined") {
            return validateOptions[field];
        }

        return {};
    }

    public check(data: Record<string, string>): [boolean, object] {
        const errorData: Record<string, string> = {};
        let formIsValid = true;
        Object.keys(data).forEach((field: string) => {
            const errorValue = this.validate(data[field], field);
            errorData[field] = errorValue;
            formIsValid = formIsValid && errorValue === '';
        })

        return [formIsValid, errorData];
    }

    public validate(value: string, field: string): string {
        const rules = this.getValidateOptions(field);
        let error = '';
        Object.keys(rules).forEach((ruleName: string) => {
            const ruleValue = rules[ruleName];
            const functionName = `_${ruleName}`
            if (error === '' && typeof this[functionName] !== 'undefined' && this[functionName](value, ruleValue)) {
                error = this.message(ruleName, ruleValue);
            }
        })

        return error;
    }

    message(ruleName: string, ruleValue: any) {
        return this.getDefaultMessage(ruleName).replace('%%value%%', ruleValue);
    }

    _required(value: Nullable<string>, ruleValue: boolean) {
        return value === '';
    }

    _min(value: string, ruleValue: number) {
        return value.length < ruleValue;
    }

    _max(value: string, ruleValue: number) {
        return value.length > ruleValue;
    }

    _login(value: string, pattern: string) {
        return !(new RegExp(pattern)).test(value);
    }

    _password(value: string, ruleValue: boolean) {
        return /[A-Z]+[0-9]+/.test(value);
    }
}