const express = require('express');
const {getShow} = require('../../DataAccess/shows');
const {createShow} = require('../../DataAccess/shows');
const {updateShow} = require('../../DataAccess/shows');
const {deleteShow} = require('../../DataAccess/shows');
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
          console.log("Got it!")
          const data = await getShow(); 
          res.send(data);
    } catch (err) {
          console.log(err);
          res.send(500, "Error-Internal Server Issue. Failure.");
    };
});

router.post('/', async function(req, res, next) {
    console.log(req.body);
       try {
             const data = await createShow(req.body); 
             res.send(data);
       } catch (err) {
             console.log(err);
             res.status(500).send  ("Error-Internal Server Issue. A total failure.");
  };
});

router.put('/:id', async function(req, res, next) {
    console.log(req.body);
       try {
             const data = await updateShow(req.params.id, req.body); 
             res.send(data);
             
       } catch (err) {
             console.log(err);
             res.status(500).send  ("Error-Internal Server Issue. A total failure.");
       };
});

router.delete('/:id', async function(req, res, next) {
    console.log(req.body);
         try {
               const data = await deleteShow(req.params.id); 
               res.send(data);
               
         } catch (err) {
               console.log(err);
               res.status(500).send  ("Error-Internal Server Issue. A total failure.");
    };
});

module.exports = router;