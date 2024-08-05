import { Request, Response, NextFunction } from "express"
import { DomainData } from "../domain-data"
import { UserGroup } from "../user-group"

export interface Controllable{
    addNew: (domainData: DomainData) => (req: Request, res: Response, next: NextFunction) => Promise<void> 
    getOne: (req: Request, res: Response, next: NextFunction) => Promise<void>

    getMany: (searchablePaths: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>

    updateOne: (domainData: DomainData, userGroup: UserGroup) => 
        (req: Request, res: Response, next: NextFunction) => Promise<void>

    modifyOne: (domainData: DomainData, userGroup: UserGroup) => 
        (req: Request, res: Response, next: NextFunction) => Promise<void>

    deleteOne: (userGroup: UserGroup) => (req: Request, res: Response, next: NextFunction) => Promise<void>
}