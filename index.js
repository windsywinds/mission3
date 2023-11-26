
const { server } = require('./server'); 

const testRouteHandler = require('./server');
const calculateValueHandler = require('./server');
const calculateRiskHandler = require('./server');
const createQuoteHandler = require('./server');

// Define routes
server.use('/test', testRouteHandler);
server.post('/calculateValue', calculateValueHandler);
server.post('/calculateRisk', calculateRiskHandler);
server.post('/createQuote', createQuoteHandler);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});


