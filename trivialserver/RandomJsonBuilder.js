import JsonResponseBuilder from './JsonReponseBuilder.js';


export default class  RandomJsonBuilder extends JsonResponseBuilder{
    constructor(request, response) {
        super(request, response);
      }
      buildBody() {
        const randomValue = Math.floor(Math.random() * 101);
        const jsonData = {randomValue};
        this.response.write(JSON.stringify(jsonData));
      }
    } 