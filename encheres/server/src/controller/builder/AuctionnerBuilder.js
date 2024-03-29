import { readFileSync } from 'fs';
import HtmlReponseBuilder from './HtmlReponseBuilder.js';
import Error404ResponseBuilder from './Error404ResponseBuilder.js';

export default class AuctionnnerBuilder extends HtmlReponseBuilder{
    constructor(request, response) {
        super(request, response);
      }
      buildBody() {
        try {
          const filePath = './public/auctioneer.html';
          console.log(`Trying to read file at path: ${filePath}`);
          
          const fileContent = readFileSync(filePath);
          console.log('File content read successfully.');
      
          this.response.write(fileContent);
        } catch (error) {
          console.error('Error reading file:', error);
          new Error404ResponseBuilder(this.request, this.response).buildResponse();
        }
      }
    }  
