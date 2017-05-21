const handlebars = require('hbs');

handlebars.registerPartials(path.join(config.root, '/app/views/partials'));

module.exports = handlebars;