import { URL } from 'url';

export default class ReponseBuilder {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.statusCode = 200;
        this.contentType = 'text/plain';
      }
    
      buildResponse() {
        this.buildHeader();
        this.buildBody();
        this.buildFooter();
        this.sendResponse();
      }
    
      buildHeader() {
        this.response.statusCode = this.statusCode;
        this.response.setHeader('Content-Type', this.contentType);
      }
    
      buildBody() {
      }
    
      buildFooter() {
      }
    
      sendResponse() {
        this.response.end();
      }
    }