var request = require('supertest');
// var assert = require('assert');
// var express = require('express');
var app = require('../server/server.js');
// var expect = require('chai').expect;

    // describe('GET', function () {
    //   it('responds with a 200 (OK)', function (done) {
    //     request(app)
    //       .get('/fetch')
    //       .expect(200,done)
    //       // .end(done)
    //   });
    // });

  it('respond with json', function(done){
    this.timeout(30000)
    request(app)
      .get('/fetch')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) {
          console.log(err)
        } 
        done()
      });
  });


describe('GET /loadCategories', function(){
  it('get request to loadCategories', function(done){
    request(app)
      .get('/loadCategories')
      .set('Accept', 'application/json')
      .expect(200, done)
      .end(function(err, res){
        if (err) {
          console.log(err)
        } 
        done()
      });
      
  });
});