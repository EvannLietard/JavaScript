import HtmlReponseBuilder from './HtmlReponseBuilder.js';

export default class FirstHtmlReponseBuilder extends HtmlReponseBuilder{
    constructor(request, response) {
        super(request, response);
      }
    buildBody() {
        this.response.write('<html><body><h1>First Serveur</h1><p>welcome sur first</p>');
        this.response.write('<link href="/public/style/style.css" rel="stylesheet" type="text/css">');

        
      }
}
