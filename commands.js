'use strict';
//can you bind  this" in a call to a required file?

//must add check, if string treat differently than file

//https://learn.fullstackacademy.com/
//workshop/55bed1bf5fce400300b263b4/content/55bf45bba3130203003032dc/text
//won't done still run before async finishes?

var fs = require('fs');
var request = require('request');

var command = {

 pwd: function(args){
  var output = process.env.PWD;

  command.done(output);
},

 date: function(args){
  var date1 = new Date();
  
  var output = date1.toString();
  command.done(output);
},

 ls: function(args){
  var output = [];
  fs.readdir('.', function(err, files){
    if (err) throw err;
    files.forEach(function(file){
      output+=(file.toString() + '\n');
    })
    command.done(output);
  });
},

 echo: function(args){
  var output = args.join(' ');
  command.done(output);
},

 cat: function(args, stdoutList){
  var output = '';
  args.forEach(function(file, index){
    fs.readFile(file,function(err,data){
      if (err) throw err;
      output += data + '\n';
      if (index === args.length - 1) done(output, stdoutList);
      //console.log('inside:',output);
    })
  });
  //console.log('outside:'+output);
  
},

 head: function(args, stdoutList){
  console.log('head called');
  var firstNLines = '';
  var output = '';
  args.forEach(function(file, index){
    fs.readFile(file,function(err,data){
      if (err) throw err;
      firstNLines = data.toString().split('\n').slice(0,5).join('\n');
      output += firstNLines + '\n';
      if (index === args.length - 1) command.done(output, stdoutList)
    })
  });
  
},

 tail: function(args){
  var lastNLines = '';
  var dataLineArray
  var output = '';
  args.forEach(function(file, index){
    fs.readFile(file,function(err,data){
      if (err) throw err;
      dataLineArray = data.toString().split('\n');
      firstNLines = dataLineArray.slice(dataLineArray.length - 5).join('\n');
      output += firstNLines;
      if (index === args.length - 1) {
        command.done(output, stdoutList);
      } else{ 
        output += '\n\nnext file\n\n';
      }
    })
  });
},

curl: function(args){
  var url = args[0];
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var output = body;
    }
    command.done(output);
  })
},

 done: function(output,stdoutList){
  if (stdoutList && stdoutList.length){
    var fn = stdoutList.shift();
    command[fn]([output], stdoutList);
  } else {
    process.stdout.write(output + '\nprompt > ');
  }
}

};


module.exports.command = command;

/*
module.exports.pwd = pwd;
module.exports.date = date;
module.exports.ls = ls;
module.exports.echo = echo;
module.exports.cat = cat;
module.exports.head = head;
module.exports.tail = tail;
*/
//module.exports.curl = curl;
