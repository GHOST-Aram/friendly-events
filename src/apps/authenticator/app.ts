import { AuthController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { AuthRouter } from "./urls/urls";
import path from 'path'
import fs from 'fs'
import { PORT } from "../../_environment";
import swaggerUi from 'swagger-ui-express'

const dataAccess  = new DataAccess()
const controller = new AuthController(dataAccess)

const authSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'auth.json'), 'utf8'));
authSpec.servers = [
    {
      "url": `http://localhost:${PORT}`,
      "description": "Local server"
    }
  ];

const authRouter = new AuthRouter(controller).registerRoutes()


authRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(authSpec) )

export{ authRouter }


