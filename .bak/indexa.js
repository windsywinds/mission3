

const { server } = require('./server'); 



const PORT = process.env.PORT || 8001;

server.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
  });
  
  