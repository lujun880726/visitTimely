/*
本程序应对业务为
手机APP积分商城，业务需求为手机商品剩余量及时更新（1秒可视为即时）。所以由客户端1秒发一次请求服务端，以这种方试进行伪及时.
小业务不想使用SOCKET进行开发。
但PHP 或着NGINX+LUA方案并不能最优所以选择用NODEJS，开发相对比较简单。

本程序完成功能为
开启一个HTTP服务，并在服务提供一个全局变量，每秒种更新相关数据，HTTP服务反回最新数据。

类似全局数据，大量访问的可以使用类似方式，当然可也以改为SOCKET版本
*/

//全局输出数据初始化
var globalRes  = {"code":"-1",'msg' : '还未初始化完成', 'data' : ''};


//HTTP服务
http = require("http");  
http.createServer(function(request, response) {  
	response.writeHead(200, {'Content-Type':'text/javascript;charset=UTF-8'});  
	response.write(JSON.stringify(globalRes));  
	response.end();  
}).listen(8080);  

//服务日志信息
console.log("Server running at http://localhost:8080/"); 


// redis 配置 & 连接
var redis   = require('redis');
var redisHost = '10.21.168.128';//输出数据初始化
var redisPort = 6379;
var redisClient  = redis.createClient(redisPort,redisHost);
redisClient.on("error", function(error) {
    console.log(error);
});
redisClient.select('0', function(error){
    if(error) {
        console.log(error);
    } else {
        runTimeDo();
        
    }
});

//定时获取
function runTimeDo(){
	//时间
	tm = require('timers'),
	//定获取相关数据
	tm.setInterval(function () {
		redisClient.get('test_key', function(error, res){
	            if(error) {
	                globalRes  = {"code":"1",'msg' : error, 'data' : ''};
	            } else {
	                globalRes  = {"code":"1",'msg' : '获取成功', 'data' : res};
	            }
	        });
	}, 1000);
} 