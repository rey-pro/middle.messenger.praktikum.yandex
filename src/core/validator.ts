type typeMessage = {
    [key: string]: string
}

interface ValidatorOptions {
    rules: {[key: string]: boolean | number };
    messages?: typeMessage;
}

export default class Validator{
    [prop: string]: any;
    private options: ValidatorOptions;
    
    messages: typeMessage = {
       'required': 'Пожалуйста, заполните поле',
       'min': 'Это поле должно содержать не менее %rule% символов',
       'max': 'Это поле должно содержать не более %rule% символов',
       'lettersdigits': 'Только латинские буквы, цифры, дефис и нижнее подчеркивание',
       'phone': 'Номер некорректный',
       'email': 'Email некорректный',
       'letterexist': "Обязательно одна буква",
       'cirillic': "Только кириллица или латиница и дефис",
       'capitalizfirst': "Первая буква заглавная",
       'capitalizexist': "Нужна хотя бы одна заглавная буква",
       'digitexist': "Нужна хотя бы одна цифра"
    };

    public constructor(options: ValidatorOptions){
        this.options = options;  
    }

    _createMessage = (message: string, settings: {[key: string] : any}) => {
        for (const key in settings) {
          message = message.replace('%' + key + '%', settings[key]);
        }
        return message;
    };

    _required(value: string){ 
        return value.length > 0;
    }

    _min(value: string, param: number){ 
        return value.length >= param;
    }

    _max(value: string, param: number){
         return value.length <= param; 
    }

    _lettersdigits(value: string){ 
        return /^[a-zA-Z0-9_-]*$/.test(value);
    }

    _letterexist(value: string){
        return /^.*[a-zA-Z]+.*$/.test(value);
    }

    _digitexist(value: string){
        return /^.*[0-9]+.*$/.test(value);
    }

    _phone(value: string){ 
        return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value);
    }

    _email(value: string){
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value); /* eslint-disable-line */
    }

    _cirillic(value: string){
        return /^[а-яёa-z-]+$/iu.test(value);
    }

    _capitalizfirst(value: string){
        return /^[А-ЯA-Z]+.*$/.test(value);
    }

    _capitalizexist(value: string){
        return /^.*[A-Z]+.*$/.test(value);
    }

    _check(fn:(param: string) => boolean, param?: any){
        console.log(fn);
        return fn(param);
    }

    validate(element: string){
        let message = '';

        for (const rule of Object.keys(this.options.rules)) {
          const param = this.options.rules[rule];  
          const fn  = `_${rule}`;   

          if (Validator.prototype.hasOwnProperty(fn) && !(Validator.prototype[fn](element, param))) {
            message = this._createMessage(this.messages[rule], {rule: param, data: element});
            break;
          }
        }

        return message;
    }
}