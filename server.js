const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // <<< install the package 1;

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//middleware

//custom middleware
function logger(req, res, next) {
	console.log(`${req.method} to ${req.originalUrl}`);
	// res.send('all gud');
	next(); // allows the request to continue to the next middleware or route handler
}

// write a gate keeper middleware that reads a password from the headers and if the password is 'mellon', let it continue
function gateKeeper(req, res, next) {
	console.log('Waiting at gate');

	next();
}
function auth(req, res, next) {
	if (req.headers === '/mellon') {
		next();
	} else {
		res.status(401).json;
	}
}

// if not, send back status code 401 and a message. Use it for the /area51 endpoint

server.use(helmet()); // <<<< use it 2;
server.use(express.json()); // built-in middleware
server.use(logger);
server.use(gateKeeper);

// endpoints
server.use('/api/hubs', hubsRouter); // the router is local middleware, because it only applies to /api/hubs

server.get('/', (req, res) => {
	const nameInsert = req.name ? ` ${req.name}` : '';

	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get('/echo', (req, res) => {
	res.send(req.headers);
});

//shift + alt + up (or down) to copy the selected lines
server.get('/area51', auth, helmet(), (req, res) => {
	console.log('Password correct');
	res.send(req.headers);
});

module.exports = server;
