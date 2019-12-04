_'Refactoring"_

## Middleware 

There are two types: 

- normal 
- error handling 

Can come from different sources: 

- built-in: included with express
- third party: need to be installed separately 
- custom: we write it! 

We can use it: 
- globally : it runs on every request to any endpoint
- locally : local middleware is only applied to a specific endpoints or group of endpoints

Middleware can: 

- inspect the 'request' and 'response' objects
- make changes to the `request` snd response `objects`
- move the `request` or `response` object to the _next_ middleware in the queue
- stop the request and send back a response to the client

** order matters! **