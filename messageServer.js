var amqp = require('amqp');
var rabbit = amqp.createConnection({
    host: 'localhost',
	port: 5672,
    vhost: '/'
});

var connlist = [];
var exchange = 'ex9.';

var messageServer = function(socket){
	rabbit.on('ready', function () {
		
		socket.on('connection', function (conn) {
			conn.on('message', function (message) {
				try {
					if (message.type == "Login") {
						//console.log("Login "+message.userid);
						try {
							if(!conn.exchange){
							  conn.exchange = rabbit.exchange(exchange, {type: 'topic',autoDelete: false,durable: false,exclusive: false,confirm: true});
							}
			
							if(!conn.q){
							  conn.q = rabbit.queue(exchange+message.userid, {durable: true, autoDelete: false, exclusive: false}
												 	, function () {
														conn.id = message.userid;
														conn.q.bind(conn.exchange, exchange+message.userid);
														conn.q.subscribe(function (message) {
															conn.write(JSON.stringify(message));
														}).addCallback(function(ok) {
														  	connlist[message.userid].ctag = ok.consumerTag;
														});
												  	});
							}
							var users="";
							for (var userid in connlist) {
								users += userid + ",";
								connlist[userid].conn.emit('users', message.userid); 	// notice to others
							}	
						  	connlist[message.userid] = {ctag:null, conn: conn};
							conn.emit('users', users+message.userid);
						} catch (err) {
							  console.log("Could not create connection to RabbitMQ. \nStack trace -->" + err.stack);
						}
					} else if (message.type == "msg") {
							message.time = new Date();
						  	conn.exchange.publish(exchange + message.toid, message);
					}
				} catch (err) {
				  console.log("ERROR ----> " + err.stack);
				}
			});
		
			conn.on('disconnect', function () {
				try {
				  	if(connlist[conn.id]){ 
						conn.q.unsubscribe(connlist[conn.id].ctag);
						delete connlist[conn.id].ctag;
				  	}
				  	delete connlist[conn.id];
					for (var userid in connlist) {
						connlist[userid].conn.emit('logout', conn.id); // notice to others
					}	
				  	conn.disconnect();
				} catch (er) {
				  console.log(":::::::: Exception Socket (ON-Disconnect) ::::::::>>>>>>> " + er.stack);
				}
			});
		}); // socket.on('connection', function (conn) {
	}); // rabbit.on('ready', function () {
} // var messageQueue = function(socket){
module.exports = messageServer;