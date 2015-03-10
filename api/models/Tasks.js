/**
* Tasks.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

//{"name": "test1", "nodeid": "1", "executionCmd": "test", "workflow": 10}
module.exports = {

  attributes: {

    name: 'string',
    nodeID: 'integer',
    executionCmd: 'string',

    workflow: {
      model: 'Workflow'
    }
  }
};

