/**
 * Created by 짱경노 on 2015-03-10.
 */
var Task = require('./Resource/Task.js');
var Fragmentation = require('./HFS/Fragmentation.js');
var VirtualMachine = require('./Resource/VirtualMachine.js');
var HFS_Static = require('./HFS/HFS_Static.js');
var ICPCP = require('./ICPCP/ICPCP.js');


module.exports = {

  taskList: [],
  init: function(tasks, links, modules){
    //console.log(tasks.length + ' ' + links.length);
    for(var i=0;i<tasks.length;i++){
      var task = new Task();
      task.nodeName = tasks[i].name;
      task.nodeID = tasks[i].nodeID;
      task.executionCmd = tasks[i].executionCmd;
      task.instanceID = tasks[i].id; // 나중에 지워도 됨....프로그램 좀 고치면..
      //console.log(i + ' ' + tasks[i].nodeID);
      var i_interface = modules[tasks[i].nodeID-1].inputinterface;
      var o_interface = modules[tasks[i].nodeID-1].outputinterfafce;/////////나중에 outputinterface로 고칠것!!! 이거 걍 내가 db에 넣을떄 오타낫음
      for(var j=0;j<i_interface.length;j++){
        //task.inputInterface.push(modules[tasks[i].nodeID-1].inputinterface[j]);
        task.addInputInterface({id: i_interface[j].id, name: i_interface[j].name, allowedTypes: i_interface[j].allowedTypes});
      }
      for(var j=0;j<o_interface.length;j++){
        //task.outputInterface.push(modules[tasks[i].nodeID-1].outputinterfafce[j]);
        task.addOutputInterface({id: o_interface[j].id, name: o_interface[j].name, allowedTypes: o_interface[j].allowedTypes});
      }

      this.taskList.push(task);
    }
    for(var i=0;i<links.length;i++){
      var from_tid = links[i].from_taskid;
      var from_iid = links[i].from_interfaceid;
      var to_tid = links[i].to_taskid;
      var to_iid = links[i].to_interfaceid;
      this.taskList[from_tid-1].link({from: Number(from_iid), to: Number(to_iid), target: this.taskList[to_tid-1]});
    }

  },
  HFS: function(deadline){
    var Frag = new Fragmentation(this.taskList, deadline);
    Frag.do();
    new HFS_Static(Frag.fragmentList).do();
    var List = VMList.vmList;
    for(var i=0;i<List.length;i++){
      console.log(List[i].test());
    }
  },
  ICPCP: function(deadline){
    new ICPCP(this.taskList, 190.0).do();
    var List = VMList.vmList;
    for(var i=0;i<List.length;i++){
      console.log(List[i].test());
    }
  }
};
