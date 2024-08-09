import path from 'path'
import fs from 'fs'
import { Router } from 'express';
import { renderDocumentationUI, updateServerInfo } from '../../utils/open-spec';
import { merge } from 'lodash';


const docsRouter = Router()

const authSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'auth.json'), 'utf8'));
const eventsSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'events.json'), 'utf8'));
const usersSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'users.json'), 'utf8'));
const eventcategoriesSpec = JSON.parse(fs.readFileSync(path.join(
    __dirname, 'docs', 'eventcategories.json'), 'utf8'));
    

[authSpec, eventsSpec, eventcategoriesSpec, usersSpec].forEach(spec =>{
    spec.servers = updateServerInfo()
})


const mergedSpecs = merge(authSpec, eventsSpec, eventcategoriesSpec, usersSpec)

docsRouter.use('/', ...renderDocumentationUI(mergedSpecs))


export { docsRouter }