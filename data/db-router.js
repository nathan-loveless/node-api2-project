const express = require('express');
const db = require('./db.js');

const router = express.Router();

//---------------------------------------------------------
// GET Requests
//---------------------------------------------------------
router.get('/', (req, res) => {
    db.find(req.query)
    .then(dbs => {
      res.status(200).json(dbs);
    })
    .catch(error => {

    });
  });

  router.get('/:id', (req, res) => {
    db.findById(req.query)
    .then(dbs => {
      res.status(200).json(dbs);
    })
    .catch(error => {

    });
  });

  router.get('/:id/comments', (req, res) => {
    db.findCommentById(req.params.id)
    .then(dbs => {
      res.status(200).json(dbs);
    })
    .catch(error => {

    });
  });

//---------------------------------------------------------
// POST Requests
//---------------------------------------------------------
router.post('/', (req, res) => {
    const dataInfo = req.body;

    let hasTitle = false;
    let hasContents = false;
        "title" in dataInfo ? hasTitle = true : hasTitle = false;
        "contents" in dataInfo ? hasContents = true : hasContents = false;
        

        if(hasTitle && hasContents) {        
            db.insert(dataInfo)
            .then(data => {
                    db.findById(data.id)
                        .then(post => {
                            res.status(201).json({success: true, post})
                        })

                        .catch(err => {
                            res.status(500).json({success: false, err})
                        })
            })
            .catch(err => {                
                res.status(500).json({success:false, errorMessage: 'There was an error while saving the user to the database'});
            });
        }
        
        else
            res.status(400).json({success: false, errorMessage: "Please provide title and contents for the post." });
        });

router.post('/:id/comments', (req, res) => {
    if("name" in changes && "bio" in changes) {
        db.update(id, changes)
        .then(updated => {
            if(updated) {
                db.findById(id)
                            .then(user => {
                                console.log("User Data: ", user);
                                res.status(200).json({success: true, user})
                            })

                            .catch(err => {
                                res.status(500).json({success: false, err})
                            })
            }
            else {
                res.status(404).json({success:false, message: 'The user with the specified ID does not exist'});
            }
        })

        .catch(err =>{
            res.status(500).json({success:false, errorMessage: 'The user information could not be modified'});
        })
    }

    else
        res.status(400).json({success:false, errorMessage: 'Please provide name and/or bio for the user'});

//---------------------------------------------------------
// PUT Requests
//---------------------------------------------------------
router.put('/:id', (req, res) => {
    db.update(req.params.id, req.query)
    .then(dbs => {
      res.status(200).json(dbs);
    })
    .catch(error => {

    });
  });

//---------------------------------------------------------
// DELETE Requests
//---------------------------------------------------------
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(dbs => {
      res.status(200).json(dbs);
    })
    .catch(error => {

    });
  });

module.exports = router;