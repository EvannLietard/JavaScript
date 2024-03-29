import { readFileSync } from 'fs';
import HtmlReponseBuilder from './HtmlReponseBuilder.js';


export default class Error404ResponseBuilder extends HtmlReponseBuilder{
    constructor(request, response) {
        super(request, response);
        this.statusCode=404;
      }
      buildBody() {
        try {
          const filePath = './public/html/error.html';
          const fileContent = readFileSync(filePath);
          this.response.write(fileContent);
        } catch (error) {
          console.error(error);
          this.response.statusCode = 404;
          this.response.write('Error 404 - Not Found');
        }
      }
}