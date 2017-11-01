'use strict';

var Model = function(args){
  if(!args) {
    args = {};
  }

  if(!args.name) {
    args.name = 'yo-vdms';
  }

  if(!args.message) {
    args.message = 'Medical Insights Team';
  }

  if(!args.generator) {
    args.generator = 'yo-generator';
  }

  var model = {};
  model.name = args.name;
  model.message = args.message;
  model.generator = args.generator;
  return model;
};

module.exports = Model;