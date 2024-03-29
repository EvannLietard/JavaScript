import { readFileSync } from 'fs';
import ReponseBuilder from './ReponseBuilder.js';

export default class PublicResponseBuilder extends ReponseBuilder {
    constructor(request, response, filePath) {
      super(request, response);
      this.filePath = filePath;
    }
  
    buildBody() {
      try {
        const fileContent = readFileSync(this.filePath);
        this.response.write(fileContent);
      } catch (error) {
        this.response.statusCode = 404;
      }
    }
  }