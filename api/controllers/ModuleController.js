/**
 * ModuleController
 *
 * @description :: Server-side logic for managing Modules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  getModule: function(req, res){
    Module.findOne({id: req.param('index')}).exec(function(error, module){
      console.log(module);
      res.json(module);
    });
  },
  getModules: function(req, res){
    Module.find().exec(function(error, modules){
      console.log(modules);
      res.json(modules);
    });
  }

};

