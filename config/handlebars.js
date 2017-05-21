const handlebars = require('hbs');
const config = require('./index');
const path = require('path');

handlebars.registerPartials(path.join(config.root, '/app/views/partials'));

module.exports = handlebars;