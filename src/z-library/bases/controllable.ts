import { Request, Response, NextFunction } from "express"
import { DomainData } from "../domain-data"

export interface Controllable{
    addNew: (domainData: DomainData) => (req: Request, res: Response, next: NextFunction) => Promise<void> 
    getOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getMany: (searchablePaths: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>
    updateOne: (domainData: DomainData) => (req: Request, res: Response, next: NextFunction) => Promise<void>
    modifyOne: (domainData: DomainData) => (req: Request, res: Response, next: NextFunction) => Promise<void>
    deleteOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
}