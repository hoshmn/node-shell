var commands = require('./commands.js');


process.stdout.write('prompt > ');
// console.log(process.argv);
process.stdin.on('data' ,function(data){
  var cmd = data.toString().trim();
  cmd = cmd.split(' ');
  var fn = cmd[0];

  var args = cmd.slice(1);

  commands[fn].call(null, args);

});
