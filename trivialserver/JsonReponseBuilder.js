import ReponseBuilder from './ReponseBuilder.js';

export default class JsonResponseBuilder extends ReponseBuilder{
    constructor(request, response) {
        super(request, response);
        this.contentType = 'application/json';
      }



}
