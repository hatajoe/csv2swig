#!/usr/bin/env node

var yargs     = require('yargs')
                .usage('Usage: app -i [file]')
                .describe('i', 'Load a file (requires)')
                .describe('t', 'swig template file (requires)')
  , argv      = yargs.argv
  , swig      = require('swig')
  , path      = require('path')
  , Converter = require("csvtojson").core.Converter;

var csvFilePath;
var swigFilePath = './temp.swig';

if (argv.i === undefined) {
  yargs.showHelp();
  process.exit(1);
}
csvFilePath = argv.i;

if (argv.t) {
  swigFilePath = argv.t;
}

var csvConverter = new Converter();
csvConverter.on("end_parsed", function(json) {
  var template = swig.compileFile(path.resolve(swigFilePath));
  var text = template(json);
  console.log(text);
  process.exit();
});

csvConverter.from(csvFilePath);

