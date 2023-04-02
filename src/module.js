console.log('Module.js');

async function start() {
  return await Promise.resolve('asyn working');
}

start().then(console.log)