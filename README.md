visitTimely
=====


本程序应对业务为
手机APP积分商城，业务需求为手机商品剩余量及时更新（1秒可视为即时）。所以由客户端1秒发一次请求服务端，以这种方试进行伪及时.
小业务不想使用SOCKET进行开发。
但PHP 或着NGINX+LUA方案并不能最优所以选择用NODEJS，开发相对比较简单。

本程序完成功能为
开启一个HTTP服务，并在服务提供一个全局变量，每秒种更新相关数据，HTTP服务反回最新数据。

类似全局数据，大量访问的可以使用类似方式，当然可也以改为SOCKET版本

