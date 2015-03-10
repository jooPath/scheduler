/**
 * WorkflowController
 *
 * @description :: Server-side logic for managing Workflows
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var Task = require('../services/Scheduler/Resource/Task.js');
module.exports = {

  initialize: function(req, res){ // http://localhost:1337/test/init/1
    console.log("initialize!");
    Workflow.findOne({id: req.param('index')}).exec(function(error, wf){

      Tasks.find({workflow: req.param('index')}).exec(function(error, tasks){
        Links.find({workflow: req.param('index')}).exec(function(error, links){
          Module.find().exec(function(error, modules){
            TaskInitialize.init(tasks, links, modules);
            var tList = TaskInitialize.taskList;
            res.json(tList);
          });
        });
      });


    });
  },

  HFS: function(req, res){ // http://localhost:1337/test/HFS/190
    if(TaskInitialize.taskList.length == 0)res.json({msg:'Error! Initialize first!'});
    else {
      TaskInitialize.HFS(req.param('deadline'));

     // ExecuteTask.do();

      var result = [];// "[";
      for(var i=0;i<VMList.vmList.length;i++){
        result.push(VMList.vmList[i].jsontest());
      }
      res.json(result);
      VMList.vmList = [];
    }
  },
  ICPCP: function(req, res){
    console.log("ICPCP!");
  }
};
