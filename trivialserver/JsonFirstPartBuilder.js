import JsonResponseBuilder from './JsonReponseBuilder.js';


export default class  JsonFirstPartBuilder extends JsonResponseBuilder{
    constructor(request, response) {
        super(request, response);
      }
      buildBody() {
        const queryParams = new URLSearchParams(this.request.url.split('?')[1]);
        const jsonData = {};
    
        for (const [key, value] of queryParams.entries()) {
          jsonData[key] = value;
        }
    
        jsonData['date'] = new Date().toISOString();
    
        this.response.write(JSON.stringify(jsonData));
      }
    } 