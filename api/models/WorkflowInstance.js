/**
* WorkflowInstance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    tasks:{
      collection: 'TasksInstance',
      via: 'workflow'
    },

    links:{
      collection: 'LinksInstance',
      via: 'workflow'
    },

    HFS: function(deadline){ // http://localhost:1337/test/HFS/190
      TaskInitialize.HFS(deadline);

      // ExecuteTask.do();

      var result = [];// "[";
      for(var i=0;i<VMList.vmList.length;i++){
        result.push(VMList.vmList[i].jsontest());
      }
      //res.json(result);
      //console.log(result);
      VMList.vmList = [];
    }

  }
};

