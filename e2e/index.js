const supertest = require("supertest");
const should    = require("should")


var server  =  supertest.agent('http://localhost:2407')

describe("SAMPLE unit test",function(){

    // #1 should return home page
  
    it("should return home page",function(done){
  
      // calling home page api
      server
      .get("/status")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        should.exist(res.body);
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.error.should.equal(false);
        done();
      });
    });
  
  });