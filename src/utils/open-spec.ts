import fs from 'fs'
import path from 'path'
import { PORT } from '../_environment';
import swaggerUi from 'swagger-ui-express'

export const getDocumentationSpecs = (subdir: string, JSONfileName: string) =>{
    return JSON.parse(fs.readFileSync(path.join(__dirname, subdir, `${JSONfileName}.json`), 'utf8'));
}

export const updateServerInfo = () =>{
    return [
        {
          "url": `http://localhost:${PORT}`,
          "description": "Local server"
        }
      ];
}

export const renderDocumentationUI = (docSpec: any) =>{
    return [swaggerUi.serve, swaggerUi.setup(docSpec)]
}