import { Controller } from "../../controller/controller";
import { CategoriesDAL } from "../mocks/data-access";
import { EventCategory } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/testing/mocks/auth";
import { user } from "../../../../z-library/testing/mocks/mock-user";
import { validData } from "../mocks/raw-data";
import { CategoryRouter } from "../../urls/urls";
import { app } from '../../../../z-library/testing/config/app'


const dataAccess = new CategoriesDAL(EventCategory, validData)
const controller = new Controller(dataAccess, 'categories')

user.userGroup = 'superuser'
const authenticator = new Authenticator(user)

const categoriesRouter = new CategoryRouter(controller, authenticator)
app.use('/categories', categoriesRouter.authenticateAndControlRoutes())

export { app }