const { Writable } = require('stream');
const stringify = require('json-stringify-safe');

module.exports = class AmqpWritableStream extends Writable {
  constructor (channel, queueName, opts = {}) {
    super(Object.assign(opts, { objectMode: true }));
    this.channel = channel;
    this.queueName = queueName;
    channel.on('drain', () => this.emit('drain'));
  }
  write (chunk, encoding, callback) {
    return this.channel.sendToQueue(this.queueName, Buffer.from(stringify(chunk)), callback);
  }
};
