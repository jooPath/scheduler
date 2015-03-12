/**
 * TasksInstanceController
 *
 * @description :: Server-side logic for managing Tasksinstances
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	executejob: function(index){

    TasksInstance.findOne({id: index}).exec(function(err, task){
      if(task.status != 'available'){ return; }
      vmtype = task.vm;

      task.status = 'running';
      setTimeout(function() {

      }, task.getExecutionTime(vmtype)*1000);

    });
  }
};

