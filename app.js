// require
const express = require('express');
const cors = require('cors');
const si = require('systeminformation');
const port = 8080;
// require-x

// initialize()
var app = module.exports = express();
app.use(cors());


// initialize-x


app.get('/',function(req,res,next){
  console.log('systeminformation');
  async function system(){
    try{

      const system  = await si.system();
      const cpu     = await si.cpu();
      const temp    = await si.cpuTemperature();
      const mem     = await si.mem();
      const osinfo  = await si.osInfo()
      const networkInterfaces = await si.networkInterfaces();
      const networkStats      = await si.networkStats();
      const user      = await si.users()

      res.json({computer: system,
                cpu: {cpu,temp},
                memory:mem,
                os:osinfo,
                network:{networkInterfaces,networkStats,user}
                })
    }
    catch(e){
      console.log(e);
    }
  }

  system();

});


app.listen(port,function(){
  console.log("listening to code on port "+port);
})
