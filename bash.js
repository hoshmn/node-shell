var commands = require('./commands.js');
//var request = require('request');

process.stdout.write('prompt > ');
// console.log(process.argv);
process.stdin.on('data' ,function(data){

  var self = commands.command;
  var fn, args;
  var cmd = data.toString().trim();
  if (cmd.indexOf('|')>-1){
  	var outs = cmd.split(/\s*\|\s*/g);
  	args = outs.shift();
  	args = args.split(' ');
  	fn = args.shift();
  	console.log('fn', fn, 'args', args, 'outs',outs);
  	self[fn].call(self, args, outs);
  } else {

  args = cmd.split(' ');
  fn = args.shift();
  console.log(fn,args);
  self[fn].call(self, args);
  }
});
