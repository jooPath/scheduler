/**
 * WorkflowController
 *
 * @description :: Server-side logic for managing Workflows
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var Task = require('../services/Scheduler/Resource/Task.js');
module.exports = {

  addWorkflow: function(req, res) {
    console.log('addWorkflow!');

  },
  execute: function(req, res){
    var deadline = 190;// req.param('deadline');
    var wid = 1;//req.param('index');

    Workflow.findOne({id:wid}).populate('tasks').populate('links').exec(function(err, wf){
      var wf_temp = {name: wf.name}; //_.pluck(wf, 'name')};//_.() //필요한 부분만 추출
      //console.log(wf);

      WorkflowInstance.create(wf_temp).exec(function(err, wi){
        var index = wi.id;
        for(var i=0;i<wf.tasks.length;i++){
          var tasks_temp = {name: wf.tasks[i].name, nodeID: wf.tasks[i].nodeID, executionCmd: wf.tasks[i].executionCmd, workflow: index};
          TasksInstance.create(tasks_temp).exec(function(err, ti){
            //console.log(ti.id);
          });
        }
        //console.log(wf.links);
        for(var i=0;i<wf.links.length;i++){
          var links_temp = {from_taskid: wf.links[i].from_taskid, from_interfaceid: wf.links[i].from_interfaceid, to_taskid: wf.links[i].to_taskid, to_interfaceid: wf.links[i].to_interfaceid, workflow: index};
          LinksInstance.create(links_temp).exec(function(err, li){
            //console.log(li.id);
          });
        }

        Module.find().exec(function(error, modules){
          TaskInitialize.init(wf.tasks, wf.links, modules);
          var tList = TaskInitialize.taskList;
          console.log(JSON.stringify(tList));

          wi.HFS(deadline);
        });
      });
    });
  }
};
