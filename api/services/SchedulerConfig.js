/**
 * Created by 짱경노 on 2015-03-09.
 */
module.exports = SchedulerConfig;

//var Task = require ('./Resource/Task.js'); //../Schedulers/HFS/Model/Task.js');
//var Task = require ('../Schedulers/ICPCP/Task.js');
function SchedulerConfig(){
  this.ARRAYMAXSIZE = 10;
  this.CloudInfo =
  {
    address: '143.248.152.13',
    port: 5000,
    userID: 'admin',
    passwd: 'ancl2014',

    toString: function(){
      return "Address: "+ this.address + ", User: " + this.userID + ", Passwd: " + this.passwd;
    }
  };
  this.DBInfo =
  {
    address: "mysql://143.248.152.16/workflowrepository",
    userID: 'root',
    passwd: '#ANCL2014kaist',

    toString: function(){
      return "DB Address: "+ this.address + ", User: " + this.userID + ", Passwd: " + this.passwd;
    }
  };
  this.VMInfo = {
    OVM_UNIT_TIME: 60000,
    RVM_UNIT_TIME: 60000
  };

  this.TestforHFS = {
    cost: [0.03, 0.06, 0.12, 0.24], // Tiny, small, medium, large
    executionTime: [
      [0.0, 0.0, 0.0, 0.0],       // dummy
      [0.0, 21.38, 13.07, 8.86],  // sdf-100
      [0.0, 26.33, 16.73, 11.79]  // sdf-200
    ],
    executionTimeAverage: [0.0, 14.43, 18.28]
  };
}
//var c = new Config();
//console.log(c.DBInfo.toString());
