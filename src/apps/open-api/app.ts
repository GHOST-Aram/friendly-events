import path from 'path'
import fs from 'fs'
import { Router } from 'express';
import { renderDocumentationUI, updateServerInfo } from '../../utils/open-spec';
import { merge } from 'lodash';


const docsRouter = Router()

const baseSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'openapi.json'), 'utf8'));
const authSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'auth.json'), 'utf8'));
const eventsSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'events.json'), 'utf8'));
const usersSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'users.json'), 'utf8'));
const eventcategoriesSpec = JSON.parse(fs.readFileSync(path.join( __dirname, 'docs', 
    'eventcategories.json'), 'utf8'));

const venuesSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'venues.json'), 'utf8'));
const venuesTypesSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 
    'venuetypes.json'), 'utf8'));
    


baseSpec.servers = updateServerInfo()


const mergedSpecs = merge(
    baseSpec, 
    authSpec, 
    usersSpec, 
    eventsSpec, 
    eventcategoriesSpec, 
    venuesSpec,
    venuesTypesSpec
)

docsRouter.use('/', ...renderDocumentationUI(mergedSpecs))


export { docsRouter }