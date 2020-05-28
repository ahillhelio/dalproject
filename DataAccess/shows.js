const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const url = process.env.DB_URL;

const dbName = "our_media";
const colName = "available_shows";
const settings = { useUnifiedTopology: true }

const getShow = () => {
    const iou = new Promise ((resolve,reject) => {
        MongoClient.connect(url, settings, function(err, client){
            if(err){
                reject(err);
            }else{
                console.log("Connected to Shows DB")
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs){
                    if (err) {
                        reject(err);
                    } else { 
                        console.log("Found the Following");
                        console.log(docs);
                        resolve(docs);
                        client.close();
                    }
                });
            }
        });
    });
    return iou;
};

const createShow = (show) => {
    const iou = new Promise ((resolve,reject) => {
        MongoClient.connect(url, settings, async function (err,client){
            if(err){
                reject(err);
            } else{
                console.log("Connected successfully to POST new Show");
                const db = client.db(dbName);
                const collection = db.collection(colName)
                collection.insertMany (show, (err, result) => {
                   if(err){
                       reject(err);
                   } else {
                       resolve(result.ops); 
                       client.close();
                   }
               })


            }
        

        })
    });
    return iou;
};

const updateShow= (id, show) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, function (err, client){
            if(err){
                reject(err);
            }else{
                console.log("Connected to server to Update Show.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({_id: ObjectID(id)},
                    show,
                    {upsert:true },
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve({ updated_id:id });
                            client.close();
                        }
                    }
                );
            }
        })
    })
    return iou;
};

const deleteShow = async (id) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, async function (err, client) { 
            if(err){
                reject(err);
            } else {
                console.log("Connected to Server to Delete Show");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                console.log(collection)
                collection.deleteMany({_id: ObjectID(id) }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else{
                         resolve(true);
                         client.close(); 
                    }
                })
            }
        })    
    })
    return iou;
}; 

module.exports = {
    getShow,
    createShow,
    updateShow,
    deleteShow
}