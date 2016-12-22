var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;
var Task = require('../db/models/Task');

chai.use(chaiHttp);

describe('Tasks', function(){
  
  Task.collection.drop();
  
  beforeEach(function(done){
    var newTask = new Task({
      location_number: "123",
      project: 'project',
      descrip: "descrip",
      priority: 'priority',
      requestor: 'requestor',
      assigned_to: 'assigned_to',
      due_date: 'due_date',
      notes: 'notes'
    });
    newTask.save(function(err){
      done();
    });
  });
  
  afterEach(function(done){
    Task.collection.drop();
    done();
  });
  
  it('should add a SINGLE task on /tasks POST', function(done) {
    chai.request(server)
    .post('/api/tasks/active')
    .send({"item_number":52, "location_number":234, "project":"task", "descrip":"Descrip", "priority":"high", "requestor":"name", "assigned_to":"name", "due_date":"12-10-2016","notes":"note"})
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.status('success');
      done();
    });
  });
  
  it('should list ALL active tasks on /tasks/active GET', function(done){
    chai.request(server)
      .get('/api/tasks/active')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0]).to.have.property('_id');
        expect(res.body[0]).to.have.property('location_number');
        expect(res.body[0]).to.have.property('project');
        expect(res.body[0]).to.have.property('descrip');
        expect(res.body[0]).to.have.property('priority');
        expect(res.body[0]).to.have.property('requestor');
        expect(res.body[0]).to.have.property('assigned_to');
        expect(res.body[0]).to.have.property('due_date');
        expect(res.body[0]).to.have.property('notes');
        expect(res.body[0].completed).to.be.false;        
        done();
      });
  });
  
  it('PUT should update a single active task to completed at /api/active/:id', function(done) {
    chai.request(server)
    .get('/api/tasks/active')
    .end(function(err, res){
      chai.request(server)
      .put('/api/tasks/active/' + res.body[0]._id)
      .send({ "completed": true })
      .end(function(error, response){
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.status('success');
        done();
      });
    });
  });
  
  it('should list a SINGLE active task on /task/active/:id GET', function(done) {
    var newTask = new Task({
      location_number: "123",
      project: 'project',
      descrip: "descrip",
      priority: 'priority',
      requestor: 'requestor',
      assigned_to: 'assigned_to',
      due_date: 'due_date',
      notes: 'notes'
    });
    newTask.save(function(err, data){
    chai.request(server)
      .get('/api/tasks/active/' + data.id)
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        done();
      });
    })
  });
  
  it.skip('should list ALL completed tasks on /tasks/completed GET', function(done){
    var newTask = new Task({
      completed: true,
      location_number: "123",
      project: 'project',
      descrip: "descrip",
      priority: 'priority',
      requestor: 'requestor',
      assigned_to: 'assigned_to',
      due_date: 'due_date',
      notes: 'notes'
    });
    newTask.save(function(err){
      chai.request(server)
        .get('/api/tasks/completed')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('location_number');
          expect(res.body[0]).to.have.property('project');
          expect(res.body[0]).to.have.property('descrip');
          expect(res.body[0]).to.have.property('priority');
          expect(res.body[0]).to.have.property('requestor');
          expect(res.body[0]).to.have.property('assigned_to');
          expect(res.body[0]).to.have.property('due_date');
          expect(res.body[0]).to.have.property('notes');
          expect(res.body[0].completed).to.be.true;
          done();
        });
    })
  });
  
   
  it.skip('should delete a SINGLE task on /tasks/completed/:id DELETE', function(done) {
    chai.request(server)
      .get("/api/tasks/completed")
      .end(function(err, res) {
        chai.request(server)
          .delete("/api/tasks/" + res.body[0]._id )
          .end(function(error, response){
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.status('success');
            done();
          });
      });
  });
});