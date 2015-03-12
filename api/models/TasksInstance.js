/**
* TasksInstance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: 'string',
    nodeID: 'integer',
    executionCmd: 'string',
    workflow: {
      model: 'WorkflowInstance'
    },
    status: {
      type: 'string',
      enum: ['available', 'waiting', 'running', 'finished']
    },
    prev: 'array',
    next: 'array',
    vm: 'integer',
    executionTime: 'integer',
    finishTime: 'integer'
  }
};

