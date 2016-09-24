const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app, express) => {
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
};
