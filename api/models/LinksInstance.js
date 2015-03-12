/**
* LinksInstance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    from_taskid: {
      type: 'int'
    },
    from_interfaceid: {
      type: 'string'
    },
    to_taskid: {
      type: 'int'
    },
    to_interfaceid: {
      type: 'string'
    },

    workflow: {
      model: 'WorkflowInstance'
    }
  }
};

