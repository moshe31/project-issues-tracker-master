/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = 'mongodb://root:admin123@ds249992.mlab.com:49992/fcc-mongo-challenges';

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const query = req.query;
      const project = req.params.project;
      
      if(query._id) query._id = new ObjectId(query._id);
      if(query.open){
        query.open == 'true' ? query.open = true : query.open = false;
      }
      MongoClient.connect(CONNECTION_STRING, (err, db) => {
        db.collection(project).find(query).toArray((err, data) => {
          res.json(data);
        })
      })
    })
    
    .post(function (req, res){
      const project = req.params.project;
      const issue = {
        issue_title: req.body.issue_title, 
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || '',
        status_text: req.body.status_text || '',
        open: true,
        created_on: new Date(),
        updated_on: new Date()
      };

      if(!issue.issue_title || !issue.issue_text || !issue.created_by){
        res.send('missing inputs');
      } else {
        MongoClient.connect(CONNECTION_STRING, (err, db) =>{
          db.collection(project).insertOne(issue, (err, data) => {
            if(err) done(res.send(err)); 
              res.json(issue);
          })
        })
      }

    })
    
    .put(function (req, res){
      const project = req.params.project;
      const id = ObjectId.isValid(req.body._id) ? req.body._id : false;
      let update = {};
    
      for(let key in req.body){
        if(key == '_id') continue;
        if(req.body[key] !== ''){
          update[key] = req.body[key];
        }
      }
      
      if(id){
        if(Object.keys(update).length !== 0){
          if(update.open == 'false') update.open = false;
             update.updated_on = new Date();
             MongoClient.connect(CONNECTION_STRING, (err, db) => {
              db.collection(project).findAndModify({"_id": ObjectId(id)}, {}, {$set: update}, {new: true}, (err, data) => {
                if(!err && data.value) {
                  res.send('successfully updated');
                } else {
                  res.send(`could not update ${id}`);
                }
              })
             });
        } else {
          res.send('no updated field sent');
        }
      } else {
        res.send("_id error");
      }
      
    })
    
    .delete(function (req, res){
      const project = req.params.project;
      const id = req.body._id;
      
      if(ObjectId.isValid(id)){
        MongoClient.connect(CONNECTION_STRING, (err, db) => {
          db.collection(project).findAndRemove({"_id": ObjectId(id)}, function(err, data){
            if(err){
              res.send(`failed: could not delete ${id}`);
            } else {
              data.value ? res.send(`deleted ${id}`) : res.send(`could not delete ${id}`);
            }
          })
        });
      } else {
        res.send("_id error");
      }
    });
    
};
