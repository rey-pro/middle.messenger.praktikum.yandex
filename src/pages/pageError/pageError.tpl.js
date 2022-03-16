import Handlebars from "handlebars";

let template = Handlebars.compile(`
<div class="main">
    <div class="error">
        <div class="error__container">
            <div class="error__text-container">
                <h6 class="error__title">{{errorCode}}</h6>
                <p class="error__subtitle">{{errorDetail}}</p>
            </div>
            <a class="error__button" href="/">Назад к чатам</a>
        </div>
    </div>
</div>
`
);

module.exports = template;