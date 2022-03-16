import template from '../pageError.tpl'

let output = template({
    errorCode: 500,
    errorDetail: 'Мы уже фиксим'
});

module.exports = {
    page: output
}