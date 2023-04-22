import { Request,Response } from "express";
import { v4 } from "uuid";
import { IGroup } from "../../models/IGroup";
import { GroupDBUtil } from "../../util/GroupDBUtil";
/**
 @usage : create a group
 @method : POST
 @body : name
 @url : http://localhost:6000/groups/
 */
 export const createGroup = async (request:Request, response:Response) => {
    try{
        // read the form data
        const {name} = request.body;

        // create contact Object
        const newGroup:IGroup = {
            id : v4(),
            name : name 
        };

        const allGroups:IGroup[] = await GroupDBUtil.readAllGroups();
        allGroups.push(newGroup);
        const isSaved:boolean = await GroupDBUtil.writeAllGroups(allGroups);
        if(isSaved){
            return  response.status(200).json(newGroup)
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : to get all groups
 @method : GET
 @body : no-params
 @url : http://localhost:6000/groups
 */
 export const getAllGroups = async (request:Request, response:Response) => {
    try{
        const allGroups:IGroup[] = await GroupDBUtil.readAllGroups();
        return  response.status(200).json(allGroups)
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : get a group
 @method : GET
 @body : no-params
 @url : http://localhost:6000/groups/:groupId
 */
 export const getGroup = async (request:Request, response:Response) => {
    try{
        const {groupId} = request.params;
        if(groupId){
            const group:IGroup | undefined = await GroupDBUtil.readGroup(groupId);
            if(group){
                return  response.status(200).json(group)
            }
            else{
                return  response.status(200).json({msg : "No Contact Found!"})
            }
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};
