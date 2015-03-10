/**
 * Created by 짱경노 on 2015-03-10.
 */
module.exports = VirtualMachine;

var _ = require('lodash');

function VirtualMachine(VMInformation) { // id, type, buildtime, terminatetime
  this.vmID = VMInformation.id;
  this.vmType = VMInformation.type;

  this.vmBuildTime = VMInformation.buildtime;
  this.vmTerminateTime = VMInformation.terminatetime;

  //this.vmRunningTime = 0;

  this.taskqueue = [];

  this.build = function(){
    //this.vmBuildTime = Math.floor(new Date().getTime() / 1000);

    //var millisecondsToWait = 5000;

    console.log(this.vmBuildTime);
  };

  this.test = function(){
    var tmp = this.vmID;

    if(this.vmType == 1)tmp += ' (small) => ';
    else if(this.vmType == 2)tmp += ' (medium) => ';
    else tmp += ' (large) => ';

    tmp += this.vmBuildTime + ' : ' + this.vmTerminateTime + '\n\t[';

    for(var i = 0; i< this.taskqueue.length;i++){
      tmp += this.taskqueue[i].instanceID + ' ';
    }
    tmp += ']';
    return tmp;
  };

  this.jsontest = function(){
    var time = [this.vmBuildTime, this.vmTerminateTime];
    var task = [];

    for(var i = 0; i< this.taskqueue.length;i++){
      task.push(this.taskqueue[i].instanceID );
    }

    if(this.vmType == 1){
      return ({id: this.vmID, type: 'small', time: time, task: task});
    }else if(this.vmType == 2){
      return ({id: this.vmID, type: 'medium', time: time, task: task});
    }
    return ({id: this.vmID, type: 'large', time: time, task: task});

  }
}
