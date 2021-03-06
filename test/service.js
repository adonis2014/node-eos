var eos = require("../lib/eos");
var RequestProtocol = require('../lib/protocol/request_protocol').RequestProtocol;
var params = require('../lib/params');

var appId = "test";
var serviceId = "testType";
var serviceVersion = "1.3";
function Service(rpcContext){
    this.rpcContext = rpcContext || new params.RpcContext();
}
Service.prototype.testMap = function(map,str,successFunc,errorFunc){
    var req = this._createReqPro("testMap",map,str);
    eos.call(req,successFunc,errorFunc);
}

Service.prototype._createReqPro = function(){
    var method = arguments[0];
    var args = [];
    if(arguments.length>1){
        for(var i=1;i<arguments.length;i++){
            args.push(arguments[i]);
        }
    }
    var req = new RequestProtocol({
        appId:appId,
        serviceId:serviceId,
        serviceVersion:serviceVersion,
        mock:"",
        debugServerIp:"",
        rpcContext:this.rpcContext,
        rpcInvocation:new params.RpcInvocation({
            "@type":"com.sunsharing.eos.common.rpc.impl.RpcInvocation",
            methodName:method,
            parameterTypes:null,
            arguments:args,
            mock:""
        })
    });
    return req;
}
module.exports = Service;