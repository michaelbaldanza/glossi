const User = require('../models/user.js');
const Scroll = require('../models/scroll.js');

function checkAuth({ message }) {
  return function (req, res, next) {
    try {
      if (req.user) {
        next();
      } else {
        throw new CustomError(message, 401);
      }
    } catch(err) {
      next(err);
    }
  }
}

async function checkCreatedBy(req, res, next) {
  try {
    if (req.query.createdBy) {
      const createdBy = await User.findOne({username: req.query.createdBy});
      if (createdBy) {
        req.query.createdBy = createdBy;
        return next();
      } else {
        throw new CustomError(
          `Could not find scrolls because user "${req.query.createdBy}" does not exist.`, 404
        );
      }
    } else {
      return next();
    }
  } catch(err) {
    next(err);
  }
}

async function getScroll(req, res, next) {
  /* This functions handles requests to view/edit/update a scroll.

    It queries for a scroll using the `id` route parameter. If no scroll with
    that Id is found, it throws error 404.

    If it finds a scroll, it adds the scroll to the request object and calls
    `next()` to forward the request as long as the scroll is not a draft and the
    current route is not `GET /:id/edit` or `PUT /:id`.
    
    In these cases, the user must be logged in as the scroll's creator for the
    function to forward the request without error. Otherwise this function throws
    error 403 to logged users and error 401 to nonlogged users.
  */

  try {
    const scrollId = req.params.id;
    const scroll = await Scroll.findById(scrollId).populate('createdBy');
    // if scroll doesn't exist, throw error 404. else add scroll to req
    if (!scroll) {
      throw new CustomError(`No scroll with _id ${req.params.id} exists.`, 404)
    } else {
      req.scroll = scroll;
    }

    const user = req.user;
    const actionStr = makeActionStr(req);
    // determine whether the route is private
    const private = (req.url.includes('edit') ||
      req.method === 'PUT' || req.method === 'DELETE') ? true : false
    ;

    if (
      !scroll.draft && !private ||
      user && scroll.createdBy._id.toString() === user._id
    ) {
      next();
    } else if (!user) {
      throw new CustomError(
        `If this scroll belongs to you, log in to ${actionStr} it.`,
        401
      );
    } else {
      throw new CustomError(
        `Can't ${actionStr} scroll.`,
        403
      );
    }
  } catch(err) {
    next(err);
  }
}

function handle(err, req, res, next) {
  console.error(err);
  const errNames = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  };
  if (err.code) {
    return res.status(err.code).json({
      name: `${err.code} ${errNames[err.code]}`,
      message: err.message,
      stack: err.stack ?? '',
    });
  } else if (err.name && err.message) {
    return res.status(500).json({name: err.name, message: err.message, stack: err.stack});
  } else {
    return res.status(500).json({name: `500 ${errNames[500]}`, message: 'An unknown error occurred.'});
  }
}

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

function isPrivate({ method, url }) {
  if (method === 'DELETE' || method === 'PUT' || url.includes('/edit')) {
    return true;
  } else {
    return false;
  }
}

function makeActionStr({ method, url }) {
  let actionStr = '';
  if (method === 'DELETE') {
    actionStr = 'delete'
  } else if (method === 'PUT') {
    actionStr = 'update'
  } else if (url.includes('/edit')) {
    actionStr = 'edit';
  } else {
    actionStr = 'edit';
  }
  return actionStr;
}

module.exports = {
  checkAuth,
  checkCreatedBy,
  CustomError,
  handleError: handle,
  getScroll,
  isPrivate,
  makeActionStr,
};