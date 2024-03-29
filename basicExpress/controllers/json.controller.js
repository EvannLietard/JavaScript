  
  /*
  define controller class for /json route
*/

class JsonController {

    constructor() {
       this.allparameters ={}; 
       // bind method to this
       this.toDate = this.toDate.bind(this);
       this.parameters = this.parameters.bind(this);
       this.parametersRandom = this .parametersRandom.bind(this);
      
    }
 
    toDate(req, res, next) {
       this.allparameters['date']  = new Date().toISOString();
       next();
    }
 
    
    parameters(req, res) {
         let params = {...this.allparameters, ...req.query} ;
         res.status(200).json(params);
    } 
    parametersRandom(req, res){
        this.allparameters['randomValue']  =  Math.floor(Math.random() * 100);
        let params = {...this.allparameters, ...req.query} ;
        res.status(200).json(params);
    }  
 
  
 
 }
 
 
 // export controller object. Could be defined as a singleton.
 module.exports = new JsonController();
 