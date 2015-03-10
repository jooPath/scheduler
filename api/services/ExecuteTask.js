/**
 * Created by 짱경노 on 2015-03-11.
 */

var Task = require('./Resource/Task.js');
var _ = require('lodash');
//var VirtualMachine = require('./Resource/VirtualMachine.js');

module.exports = {
  currentTime: 'float',
  do: function(){
    var head;
    var taskList = [];

    for(var i=0;i<VMList.vmList.length;i++){
      for(var j=0;j<VMList.vmList[i].taskqueue.length;j++){
        var t = VMList.vmList[i].taskqueue[j];
        if(t.instanceID == -1)head = taskList.length;
        taskList.push({task: t, vmid: VMList.vmList[i].vmID, vmtype: VMList.vmList[i].vmType});
      }
    }
    this.currentTime = new Date();
    this.executejob(taskList, taskList[head]);
  },
  executejob: function(tList, vmtask){
    var task = vmtask.task;
    var vmtype = vmtask.vmtype;

    if(task.status != 'available') return;

    console.log('Task '+ task.nodeName + ' executed from ' + this.timer(this.currentTime));
    setTimeout(function() {
      task.status = 'finished';
      var next = task.nextConnectedList();
      for(var i=0;i<next.length;i++){
        var nextTask, index;
        for(var k=0;k<tList.length;k++){
          if(tList[k].task.instanceID == next[i].connected){
            nextTask = tList[k].task;
            index = k;
            break;
          }
        }
        //var nextTask = tList[this.findIndexbyInstanceID(tList, next[i].connected)];
        var nprev = nextTask.prevConnectedList();
        var cnt = nprev.length;

        for(var j=0;j<nprev.length;j++){
          var nprevTask;// = tList[this.findIndexbyInstanceID(tList, nprev[j].connected)];
          for(var k=0;k<tList.length;k++){
            if(tList[k].task.instanceID == nprev[j].connected){
              nprevTask = tList[k].task;
              break;
            }
          }
          if(nprevTask.status == 'finished')cnt--;
        }
        if(cnt == 0) {nextTask.status = 'available';}
        //this.executejob(tList, nextTask);
        arguments.callee(tList, tList[index]);
      }
    }, task.getExecutionTime(vmtype)*1000);
  },
  timer: function(origin){
    return (new Date() - origin);
  }
};
