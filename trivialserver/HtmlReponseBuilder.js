import ReponseBuilder from './ReponseBuilder.js';

export default class HtmlReponseBuilder extends ReponseBuilder {
    constructor(request, response) {
        super(request, response);
        this.contentType='text/html';

      }
      buildFooter() {
        this.response.write('</body></html>');
      }
}