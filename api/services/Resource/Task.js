/**
 * Created by 짱경노 on 2015-01-14.
 */

module.exports = Task;

var _ = require('lodash');

function Task(){ // {name:'T1', nodeid:'1', instanceid:'1', cmd:'11111'}
  this.nodeName = "1";
  this.nodeID = "1";
  this.instanceID = "1";
  this.executionCmd = "1";

  this.inputInterface = [];
  this.outputInterface = [];
  this.status = 'waiting'; // 'available', 'waiting', 'executing', 'finished'

  this.EST = null;
  this.EFT = null;
  this.LST = null;
  this.LFT = null;

  this.AST = null;
  this.AFT = null;

  this.addOutputInterface = function(interfaceinfo){//{id:'1', name:'o1', allowedTypes:[]}
    if(_.findIndex(this.outputInterface, function(chr){return chr.id == interfaceinfo.id;}) == -1) {
      this.outputInterface.push({
        id: interfaceinfo.id,
        name: interfaceinfo.name,
        allowedTypes: interfaceinfo.allowedTypes,
        instanceID: this.instanceID,
        connected: null,
        connectedInterfaceID: null
      });
    }
  };

  this.addInputInterface = function(interfaceinfo){//{id:'1', name:'i1', allowedTypes:[]}
    if(_.findIndex(this.inputInterface, function(chr){return chr.id == interfaceinfo.id;}) == -1) {
      this.inputInterface.push({
        id: interfaceinfo.id,
        name: interfaceinfo.name,
        allowedTypes: interfaceinfo.allowedTypes,
        instanceID: this.instanceID,
        connected: null,
        connectedInterfaceID: null
      });
    }
  };
  this.removelink = function(target, type){ // {from:'1', to:'1', target:t2}
    //var target = linkinfo.target;
    var i,o;
    if(type == 'next') {    // this --> target
      i = _.findIndex(target.inputInterface, {connected: this.instanceID});
      o = _.findIndex(this.outputInterface, {connected: target.instanceID});
      this.outputInterface[o].connected = null;
      target.inputInterface[i].connected = null;

      if(target.instanceID == '-1' || target.instanceID == '-2' || this.instanceID == '-1' || this.instanceID == '-2'){
        this.outputInterface.splice(o, 1);
        target.inputInterface.splice(i,1);
      }
    }else{                  // target --> this
      o = _.findIndex(target.outputInterface, {connected: this.instanceID});
      i = _.findIndex(this.inputInterface, {connected: target.instanceID});
      target.outputInterface[o].connected = null;
      this.inputInterface[i].connected = null;

      if(target.instanceID == '-1' || target.instanceID == '-2' || this.instanceID == '-1' || this.instanceID == '-2'){
        target.outputInterface.splice(o, 1);
        this.inputInterface.splice(i,1);
      }
    }
    //remove dummy input&output interfaces.
  };

  this.link = function(linkinfo){ // {from:'1', to:'1', target:t2}
    var target = linkinfo.target;
    var i = _.findIndex(target.inputInterface, {id: linkinfo.to});
    var o = _.findIndex(this.outputInterface, {id: linkinfo.from});

    this.outputInterface[o].connected = target.instanceID;
    this.outputInterface[o].connectedInterfaceID = linkinfo.to;

    target.inputInterface[i].connected = this.instanceID;
    target.inputInterface[i].connectedInterfaceID = linkinfo.from;
  };

  this.nextConnectedList = function(){
    return _.filter(this.outputInterface, function(value){
      return (value.connected != null);
    })
  };
  this.prevConnectedList = function(){
    return _.filter(this.inputInterface, function(value){
      return (value.connected != null);
    })
  };

  // For Test
  this.getExecutionTime = function(vmType){
     var executionTime= [
      [0.0, 0.0, 0.0, 0.0],       // dummy
      [0.0, 21.38, 13.07, 8.86],  // sdf-100
      [0.0, 26.33, 16.73, 11.79]  // sdf-200
    ];
    return executionTime[this.nodeID][vmType];
  };
  this.getAverageExecutionTime = function(){
    var executionTimeAverage = [0.0, 14.43, 18.28];
    return executionTimeAverage[this.nodeID];
  };
}
