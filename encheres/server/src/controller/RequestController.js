import { URL } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import * as fs from 'fs';
import IndexBuilder from './builder/indexBuilder.js';
import AuctionnnerBuilder from './builder/AuctionnerBuilder.js';
import BidderBuilder from './builder/BidderBuilder.js';
import aboutBuilder from './builder/aboutBuilder.js';
import Error404ResponseBuilder from './builder/Error404ResponseBuilder.js';
import PublicResponseBuilder from './builder/PublicResponseBuilder.js';


const BASE = 'http://localhost/';

export default class RequestController {
  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request;
    this.#response = response;
    this.#url = new URL(this.request.url, BASE).pathname;
    //this.buildRoutes();
  }

  buildRoutes() {
    switch (this.#url) {
      case '/':
        this.#url = '/public/html/index.html';
        break;
      case '/style/style.css':
        this.#url = '/public/style/style.css';
        break;
      case '/about':
        this.#url = '/public/html/about.html';
        break;
      case '/auctioneer':
        this.#url = '/public/auctioneer.html';
        break;
      case '/bidder':
        this.#url = '/public/bidder.html';
        break;
      case '/scripts/auctioneer-bundle.js':
        this.#url = '/public/scripts/auctioneer-bundle.js'
        break;
      case '/scripts/bidder-bundle.js':
        this.#url = '/public/scripts/bidder-bundle.js'
        break;
      case '/images/png-clipart-pixel-art-start-button-text-logo-thumbnail.png':
        this.#url='/public/images/png-clipart-pixel-art-start-button-text-logo-thumbnail.png';
        break
      case '/images/auction_hammer.png':
        this.#url='/public/images/auction_hammer.png';
        break
      default:
        this.#url = '/public/html/error.html'; 
        break;
    }
  }

  get response() {
    return this.#response;
  }

  get request() {
    return this.#request;
  }

  get url() {
    return this.#url;
  }

   handleRequest() {
    this.buildResponse();
    this.response.end();
  }

   /*buildResponse() {
    try {
       // console.log('Checking if resource exists:', `.${this.url}`); plus besoins actuellement car plus d'erreur
       fs.accessSync(`.${this.url}`);
       //console.log('Reading file:', `.${this.url}`);
      const data =  fs.readFileSync(`.${this.url}`);
      //console.log('File read successfully. Setting status code to 200.');
      this.response.statusCode = 200;
      this.response.write(data);
    } catch (err) {
      this.response.statusCode = 404;
      this.response.write('erreur');
    }
  }*/
  buildResponse() {
    console.log('Trying to access:', this.#url);
    if (this.#url == '/') {
      new IndexBuilder(this.#request, this.#response).buildResponse();
    } else if (this.#url == '/auctioneer') {
      new AuctionnnerBuilder(this.#request, this.#response).buildResponse();
    } else if (this.#url == '/bidder') {
      new BidderBuilder(this.#request, this.#response).buildResponse();
    } else if (this.#url=='/about') {
      new aboutBuilder(this.#request, this.#response).buildResponse();
    } else if (this.#url.startsWith('/public')) { 
      console.log('Passing to PublicResponseBuilder');
      const filePath = this.#url.substring(7); // Remove '/public'
      new PublicResponseBuilder(this.#request, this.#response, filePath).buildResponse();
    }else {
      new Error404ResponseBuilder(this.#request, this.#response).buildResponse();
    }
  }
}
