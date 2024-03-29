import { URL } from 'url';
import SecondHtmlReponseBuilder from './SecondHtmlReponseBuilder.js';
import FirstHtmlReponseBuilder from './FirstHtmlReponseBuilder.js';
import Error404ResponseBuilder from './Error404ResponseBuilder.js';
import JsonFirstPartBuilder from './JsonFirstPartBuilder.js';
import RandomJsonBuilder from './RandomJsonBuilder.js';
import PublicResponseBuilder from './PublicResponseBuilder.js';

export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
  }

  get response() {
    return this.#response;
  }

  handleRequest() {
    this.buildResponse();
  }



  buildResponse()  {
    if (this.#url.pathname == '/'){
      this.response.write('welcome');
    }
    else if (this.#url.pathname.startsWith('/first')) {
      new FirstHtmlReponseBuilder(this.#request, this.#response).buildResponse();
    }
    else if (this.#url.pathname.startsWith('/second')) {
      new SecondHtmlReponseBuilder(this.#request, this.#response).buildResponse();
    }
    else if (this.#url.pathname.startsWith('/json')){
      new JsonFirstPartBuilder(this.#request,this.#response).buildResponse(); 

    }
    else if (this.#url.pathname.startsWith('/random')){
      new RandomJsonBuilder(this.#request,this.#response).buildResponse(); 

    }
    else if (this.#url.pathname.startsWith('/public')) {
      const filePath = `.${this.#url.pathname}`;
      new PublicResponseBuilder(this.#request, this.#response, filePath).buildResponse();
    } 
    else{
      new Error404ResponseBuilder(this.#request, this.#response).buildResponse();
    } 
    

    this.response.end();
  }

}