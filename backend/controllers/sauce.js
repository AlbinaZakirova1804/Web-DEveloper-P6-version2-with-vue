const Sauce = require('../models/sauce');
global.atob = require("atob");


//*************CREATE**************/
exports.createSauce = (req, res, next) => {

  req.body.sauce = JSON.parse(req.body.sauce);//convert string into json object
  console.log(req.body);
  const url = req.protocol + '://' + req.get('host');


  console.log("I'm here in create sauce!");
    const sauce = new Sauce({
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,//number
      dislikes: req.body.sauce.dislikes,//count number
      userLiked: req.body.sauce.userLiked,//array string
      userDisliked: req.body.sauce.userDisliked
    });

    sauce.save().then(
      () => {
        res.status(201).json({
          message: 'Sauce saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

//***********VIEW ALL******************/
exports.viewAllSauces = (req, res, next) => {
  //console.log(req.locals.user + "<- Loged in User.");
  console.log("I am about to veiw all sauces");
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }
  
//***********VIEW ONE*****************/  
exports.viewSauce = (req, res, next) => {
  console.log("i am about to view a single sauce");
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }

//************UPDATE*************/
exports.updateSauce = (req, res, next) => {
  /*****************************************/

    currentUser = LoggedUser(req);
    console.log(currentUser);
  /********************************************/  

     console.log("I am in Update sauce!");
    const sauce = { _id: req.params._id};

    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
      "_id": req.params._id,
      "userId" : req.body.sauce.userId,
      "name" : req.body.sauce.name,
      "manufacturer" : req.body.sauce.manufacturer,
      "description" : req.body.sauce.description,
      "imageUrl" : url + '/images/' + req.file.filename,
      "heat" : req.body.sauce.heat,
      "likes" : req.body.sauce.likes,
      "dislikes" : req.body.sauce.dislikes,
      "usersDisliked" : req.body.sauce.usersDisliked,
      "usersLiked" : req.body.sauce.usersLiked
      };
    } else {
      //sauce = {};
      sauce._id = req.body._id
      sauce.userId = req.body.userId,
      sauce.name = req.body.name,
      sauce.manufacturer = req.body.manufacturer,
      sauce.description = req.body.description,
      sauce.imageUrl = req.body.imageUrl,
      sauce.heat = req.body.heat,
      sauce.likes = req.body.likes,
      sauce.dislikes = req.body.dislikes;
      sauce.usersDisliked = req.body.usersDisliked;
      sauce.usersLiked = req.body.usersLiked
    }
    /*const sauce = {};
      sauce.userId = req.body.userId,
      sauce.name = req.body.name,
      sauce.manufacturer = req.body.manufacturer,
      sauce.description = req.body.description,
      sauce.imageUrl = req.body.imageUrl,
      sauce.heat = req.body.heat,
      sauce.likes = req.body.likes,
      sauce.dislikes = req.body.dislikes;
      sauce.usersDisliked = req.body.usersDisliked;
      sauce.usersLiked = req.body.usersLiked*/
    //
    console.log("I am in Update and this is current user-> "+currentUser);
    Sauce.updateOne({_id: req.params.id, userId: currentUser}, sauce).then(
      () => {
        res.status(201).json({sauce});
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }

//**********DELETE****************/  
exports.deleteSauce = (req, res, next) => {

/******************************************/
   currentUser = LoggedUser();
/********************************************/

   console.log('I am a current user in delete-> '+ currentUser);
   
   Sauce.findOne({_id: req.params.id, userId: currentUser}).then(
     (sauce)=>{
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            console.log(error);
            res.status(400).json({
              error: error
            });
            console.log(error);
          });
        }
      );
      });
    };
    /*Sauce.deleteOne({_id: req.params.id, userId: currentUser}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400).json({
          error: error
        });
        console.log(error);
      }
    );
    }*/

//*************LIKE/DISLIKE******************/
exports.likeSauce = async(req, res, next) => {

//**************find current user********************/
  
let currentUser = LoggedUser(); //assign logged user to variable "currentUser"
/****************************************************/

console.log("logged user is -> "+ currentUser);

//**************choose *****************/
  const like = await(req.body.like);
//number sent from front end (1 or 0 or -1)
  console.log("like is "+like);
    switch(like) {
      /*******like******/
      case '1':
      // console.log("case 1");
        Sauce.findOneAndUpdate({_id: req.params.id}, 
          {$addToSet:{usersLiked: currentUser}, $inc: { likes : 1 }}, {new: true},  function(err, result) {
          
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
          });
          break;
        /**********dislike**********/
       case '-1':
         //console.log("case -1");
          Sauce.findOneAndUpdate({_id: req.params.id},
            {$addToSet:{usersDisliked: currentUser}, $inc:{ dislikes: 1 }}, {new: true}, function(err, result) {
              
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
            });
           break;
        /*********remove like and dislike by current user*********/
        case '0':
        // console.log("case 0");
          Sauce.findOneAndUpdate({_id: req.params.id}, 
             {$pull:{usersLiked: currentUser, usersDisliked: currentUser}}, {new:true},
        
         function(err, result) {
            if (err) {
              res.send(err);
            } else {
             
                result.likes = result.usersLiked.length;
                result.dislikes = result.usersDisliked.length;
                result.save();
                
              res.send(result);
            }
          })
          break;
      default:
      console.log("default");
    }
  }



  function LoggedUser (req){ //define logged user
    const base64Url = req.headers.authorization.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return (JSON.parse(jsonPayload).userId); //user id
   }