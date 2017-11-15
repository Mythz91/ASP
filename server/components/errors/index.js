/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, function (err) {
 if(err) { return res.status(404).end(); }
    if (err) { return res.status(result.status).json(result); }

    res.render(viewFilePath);
  });
};