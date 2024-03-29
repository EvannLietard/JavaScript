import HtmlReponseBuilder from './HtmlReponseBuilder.js';

export default class SecondHtmlReponseBuilder extends HtmlReponseBuilder{
    constructor(request, response) {
        super(request, response);
      }
    buildBody() {
        this.response.write('<html><body><h1>Second Serveur</h1><p>welcome sur second</p>');
        this.response.write('<img src="/public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">');
        this.response.write('<link href="/public/style/inexistant.css" rel="stylesheet" type="text/css">');


      }
}
