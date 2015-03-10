/**
* Workflow.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

//{"name":"knworkflow"}
module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    tasks:{
      collection: 'Tasks',
      via: 'workflow'
    },

    links:{
      collection: 'Links',
      via: 'workflow'
    }

  }
};

