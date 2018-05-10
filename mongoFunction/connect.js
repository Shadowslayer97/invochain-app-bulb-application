var MongoClient = require('mongodb').MongoClient;

exports.getBulbState = function(req,res){

    var colour;
    MongoClient.connect(process.env.MongoURL,function(err,database){
        var bulbstate;
      if(err)
      {
        console.log('Error connecting to DB');
        process.exit(1);
      }
      database.db('invochain-bulb').collection('electric-').find({}).toArray(function(err,doc){
        if(err)
          console.log('Cant get doc');
        else{
          bulbstate = doc[0].bulbstate;
          var switchstate;
          console.log(bulbstate);
          if(bulbstate){
            colour="yellow";
            switchstate="ON";
          }
          else {
            colour = "grey";
            switchstate="OFF";
          }
        changeBulbState(database,bulbstate)

      res.render('home',{
        colour : colour,
        switchstate : switchstate
      });


        }
      });
    });
}

function changeBulbState(database,bulbstate){
  database.db('invochain-bulb').collection('electric-')
    .findOneAndUpdate({},{$set:{"bulbstate":!bulbstate}},function(err,doc){
      if(err) {console.log('Error at changeState');}
      else {
        console.log('Updated value');
      }
    })

}
