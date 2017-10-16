var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO
var dateTime = require('node-datetime');

var server = http.createServer(function(request, response) {

  var path = url.parse(request.url).pathname;
  console.log( dateTime.create().format('Y-m-d H:M:S') + " " 
    + 'Connection, request url = ' + path);
  switch (path) {

    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;

    case '/socket.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        response.end();
      });
      break;

    case '/rescueSystem.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        response.end();
      });
      break;

    case '/api/rescue/getAllRescueEvents':
        var rescueAPI = require("./rescue/rescueAPI");
        rescueAPI.getAllRescueEvents(function(data){
          response.write(JSON.stringify(data), "utf8");
          response.end();
        });

      break;

    case '/api/rescue/getAllUnassignedEvents':
        var rescueAPI = require("./rescue/rescueAPI");
        rescueAPI.getAllUnassignedEvents(function(data){
          response.write(JSON.stringify(data), "utf8");
          response.end();
        });

      break;

    case '/api/rescue/getAllAssignedEvents':
        var rescueAPI = require("./rescue/rescueAPI");
        rescueAPI.getAllAssignedEvents(function(data){
          response.write(JSON.stringify(data), "utf8");
          response.end();
        });

      break;

    case '/api/rescue/getAllHistoryEvents':
        var rescueAPI = require("./rescue/rescueAPI");
        rescueAPI.getAllHistoryEvents(function(data){
          response.write(JSON.stringify(data), "utf8");
          response.end();
        });

      break;

    case '/api/rescue/addOneRescueEvent':

        if (request.method == 'POST') {
          request.on('data', function (data) {
            //console.log("post data: " + data);
            data = JSON.parse(data);
            var rescueAPI = require("./rescue/rescueAPI");
            rescueAPI.addOneRescueEvent(data.runner_id, data.rescuer_id, data.recv_time,
              data.arrival_time, data.finish_time, data.chief_complaint, data.trauma_part,
              data.diagnosis, data.trauma_type, data.current_cure, data.later_cure, function(result){
                if(result){
                  response.writeHead(200, {'Content-Type': 'text/html'});
                  response.end('addOneRescueEvent successed!');
                  console.log("addOneRescueEvent successed!");
                }
            });

          });

          request.on('end', function () {

          });
        }

        /*
        var rescueAPI = require("./rescue/rescueAPI");
        rescueAPI.getAllHistoryEvents(function(data){
          response.write(JSON.stringify(data), "utf8");
          response.end();
        });
        */
      break;

    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});

server.listen(8001);


/*
//使用socket.io
var serv_io = io.listen(server);
serv_io.set('log level', 1); // 關閉 debug 訊息

serv_io.sockets.on('connection', function(socket) {
  setInterval(function() {
    socket.emit('date', {'date': new Date()});
  }, 1000);

  // 接收來自於瀏覽器的資料
  socket.on('client_data', function(data) {
    serv_io.sockets.emit('board_msg', {'board_msg': data.msg});
    console.log(data.msg);
//    process.stdout.write(data.msg);
  });

});
*/
