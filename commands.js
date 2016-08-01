var fs = require('fs');
var request = require('request');

function pwd(args){
  process.stdout.write(process.env.PWD);
  process.stdout.write('\nprompt > ');
}

function date(args){
  var date1 = new Date(args);
  process.stdout.write(date1.toString());
  process.stdout.write('\nprompt > ');
}

function ls(args){
  fs.readdir('.', function(err, files){
    if (err) throw err;
    files.forEach(function(file){
      process.stdout.write(file.toString() + '\n');
    })
    process.stdout.write('\nprompt > ');
  });
}

function echo(args){
  process.stdout.write(args.join(' '));
  process.stdout.write('\nprompt > ');
}

function cat(args){
  var output = '';
  args.forEach(function(file, index){
    fs.readFile(file,function(err,data){
      if (err) throw err;
      output += data + '\n';
      }
    })
  });
  done(output);
}

function head(args){
  var firstNLines = '';
  var output = '';
  args.forEach(function(file, index){
    fs.readFile(file,function(err,data){
      if (err) throw err;
      firstNLines = data.toString().split('\n').slice(0,5).join('\n');
      output += firstNLines + '\n';
      }
    })
  });
  done(output);
}

function tail(args){
  var lastNLines = '';
  var dataLineArray
  var output = '';
  args.forEach(function(file, index){
    fs.readFile(file,function(err,data){
      if (err) throw err;
      dataLineArray = data.toString().split('\n');
      firstNLines = dataLineArray.slice(dataLineArray.length - 5).join('\n');
      output += firstNLines + '\n';
      }
    })
  });
  done(output);
}

function curl(args){
  var url = args[0];
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      process.stdout.write(body);
    }
    process.stdout.write('\nprompt > ');
  })
}

function done(output){
  process.stdout.write(output + '\nprompt > ');
}

module.exports.pwd = pwd;
module.exports.date = date;
module.exports.ls = ls;
module.exports.echo = echo;
module.exports.cat = cat;
module.exports.head = head;
module.exports.tail = tail;
module.exports.curl = curl;
