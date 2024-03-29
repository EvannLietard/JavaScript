import HtmlReponseBuilder from './HtmlReponseBuilder.js';

export default class Error404ResponseBuilder extends HtmlReponseBuilder{
    constructor(request, response) {
        super(request, response);
        this.statusCode=404;
      }
    buildBody() {
        this.response.write('<h1>404: Page not found</h1>');
      }
}