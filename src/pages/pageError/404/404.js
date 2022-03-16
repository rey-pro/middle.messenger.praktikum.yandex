import template from '../pageError.tpl'

let output = template({
    errorCode: 404,
    errorDetail: 'Не туда попали'
});

module.exports = {
    page: output
}