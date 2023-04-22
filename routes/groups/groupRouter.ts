import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import * as groupController from "../../controller/groups/groupController";
import { FormValidationMiddleware } from '../../middlewares/FormValidationMiddleware';

const groupRouter:Router = Router();

/**
 @usage : create a Group
 @method : POST
 @body : name
 @url : http://localhost:6000/groups/
 */
 groupRouter.post("/", [
    body('name').not().isEmpty().withMessage("Name is Required"),
], FormValidationMiddleware, async (request:Request, response:Response) => {
    return await groupController.createGroup(request,response);
})

/**
 @usage : to get all Groups
 @method : GET
 @body : no-params
 @url : http://localhost:6000/groups
 */
 groupRouter.get("/", async (request:Request, response:Response) => {
    return await groupController.getAllGroups(request,response);
})

/**
 @usage : get a group
 @method : GET
 @body : no-params
 @url : http://localhost:6000/groups/:groupId
 */
 groupRouter.get("/:groupId", async (request:Request, response:Response) => {
    return await groupController.getGroup(request,response);
})
export default groupRouter;