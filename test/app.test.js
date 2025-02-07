const assert = require('assert');
const http = require('http');
const app = require('/index.js');

describe('Simple Test', function() {
  it('should return true', function() {
    assert.strictEqual(true, true);
  });
});

describe('GET /', function() {
  it('should return status 200', function(done) {
    http.get('http://localhost:3000', (res) => {
      assert.strictEqual(res.statusCode, 200);
      done();
    });
  });
});
