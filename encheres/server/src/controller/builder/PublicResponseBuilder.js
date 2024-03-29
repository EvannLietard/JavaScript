import { readFileSync } from 'fs';
import ReponseBuilder from './ReponseBuilder.js';
import Error404ResponseBuilder from './Error404ResponseBuilder.js';
import { getContentTypeFrom } from '../../util/Util.js';
import { resolve } from 'path';

export default class PublicResponseBuilder extends ReponseBuilder {
    constructor(request, response, filePath) {
      super(request, response);
      this.filePath = filePath;
    }
  
    buildBody() {
      try {
        console.log('Trying to read file at path:', this.filePath);
    
        // Construire le chemin correctement en utilisant le dossier public comme base
        const basePath = resolve('./public');
        const filePath = resolve(basePath, this.filePath.substring(1)); // Supprimer le '/' initial
    
        console.log('Full file path:', filePath);
    
        const fileContent = readFileSync(filePath, 'utf-8');
        console.log('File content read successfully.');
    
        const contentType = getContentTypeFrom(filePath);
        console.log('Content type:', contentType);
    
        this.response.setHeader('Content-Type', contentType);
        this.response.write(fileContent);
      } catch (error) {
        console.error('Error reading file:', error);
        new Error404ResponseBuilder(this.request, this.response).buildResponse();
      }
    }
  }
 