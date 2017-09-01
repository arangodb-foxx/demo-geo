'use strict';

const joi = require('joi');
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
const errors = require('@arangodb').errors;
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;

const restaurants = db._collection('restaurants');
const neighborhoods = db._collection('neighborhoods');

const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

module.context.use(router);

router.get('/restaurants', function (req, res) {
  try {
    // const data = foxxColl.document(req.pathParams.key);
    const data = restaurants.any();
    res.send(data);
  } catch (e) {
    if (!e.isArangoError || e.errorNum !== DOC_NOT_FOUND) {
      throw e;
    }
    res.throw(404, 'The entry does not exist', e);
  }
})
.response(joi.object().required(), 'Entry stored in the collection.')
.summary('Retrieve an entry')
.description('Retrieves an entry from the "myFoxxCollection" collection by key.');

router.get('/neighborhoods', function (req, res) {
  try {
    // const data = foxxColl.document(req.pathParams.key);
    const data = neighborhoods.any();
    res.send(data);
  } catch (e) {
    if (!e.isArangoError || e.errorNum !== DOC_NOT_FOUND) {
      throw e;
    }
    res.throw(404, 'The entry does not exist', e);
  }
})
.response(joi.object().required(), 'Entry stored in the collection.')
.summary('Retrieve an entry')
.description('Retrieves an entry from the "myFoxxCollection" collection by key.');

router.get('/pointsInNeighborhood/:id', function (req, res) {
  try {
    var id = req.pathParams.id;
    var neighborhood = neighborhoods.document(id);

    const keys = db._query(aql`
      FOR restaurant IN restaurants
      FILTER IS_IN_POLYGON(${neighborhood.geometry.coordinates[0]}, restaurant.location.coordinates[0], restaurant.location.coordinates[1])
      RETURN restaurant
    `);
    res.send(keys);
  } catch (e) {
    if (!e.isArangoError || e.errorNum !== DOC_NOT_FOUND) {
      throw e;
    }
    res.throw(404, 'The entry does not exist', e);
  }
})
.response(joi.object().required(), 'Entry stored in the collection.')
.summary('Retrieve an entry')
.description('Retrieves an entry from the "myFoxxCollection" collection by key.');
