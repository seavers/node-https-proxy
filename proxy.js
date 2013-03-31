var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  c.once('data', function(data) {
    //console.log('=====BEGIN=====\r\n'+data.toString()+'\r\n======END=====\r\n');
    var address = data.toString().split(' ')[1].split(':');
    //console.log('connect: '+ address);

    var client = net.connect(address[1], address[0], function(){
        console.log('connected ' + address);
        c.pipe(client);
        client.pipe(c);
        c.write('HTTP/1.1 200 OK\r\n\r\n');
    });  
    client.on('error', function(err) {
        console.error(err);
        c.end('HTTP/1.1 503 GATEWAY ERROR\r\n');
    });
  });
});
server.listen(8124, function() { //'listening' listener
  console.log('https proxy start =>  PORT:8124');
});
