var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var User = require('../db/models/User');

chai.use(chaiHttp);

describe('Users', function(){
  
  User.collection.drop();
  
  beforeEach(function(done){
    var newUser = new User({
      first_name: "giant",
      last_name: 'douche',
      email: 'email',
      username: 'giantdouche',
      password: 'theDonald1234'
    });
    newUser.save(function(err){
      done();
    });
  });
  
  afterEach(function(done){
    User.collection.drop();
    done();
  });
  
  it('GET should list All users at /api/users', function(done){
    chai.request(server)
    .get('/api/users')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('username');
      done();
    });
  });
  
  it('GET should list a SINGLE user at /api/user/:id ', function(done) {
    var newUser = new User({
      username: "giant douche",
    });
    newUser.save(function(err, data){
      chai.request(server)
      .get('/api/users/' + data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('_id');
        res.body.should.have.a.property('username');
        res.body._id.should.equal(data.id);
        done();
      });
    });
  });
  
  it("POST should add a single user", function(done) {
    chai.request(server)
    .post('/api/users')
    .send({"username": "giantdouche", "password":"theDonald1234", "first_name":"Donald", "last_name":"Trump", "email":"Hillary@PrivateServer.com" })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.status("success");
      done();
    });
  });
  
  it('PUT should update a single user at /api/users/:id', function(done) {
    chai.request(server)
    .get('/api/users')
    .end(function(err, res){
      chai.request(server)
      .put('/api/users/' + res.body[0]._id)
      .send({"password": "turdsandwich"})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.status('success');
        done();
      });
    });
  });
  
  it('DELETE should delete a single user at /api/users/:id', function(done) {
    chai.request(server)
    .get("/api/users")
    .end(function(err, res){
      chai.request(server)
      .delete("/api/users/" + res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.status('success');
        done();
      });
    });
  });
});