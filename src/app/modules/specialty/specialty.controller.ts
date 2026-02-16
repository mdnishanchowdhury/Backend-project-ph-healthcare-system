import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsnc";
import { sendResponse } from "../../shared/sendResponse";

const createSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await SpecialtyService.createSpecialty(payload);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: 'Specialty created successfully',
            data: result
        })
    }
)



const getAllSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SpecialtyService.getAllSpecialty()

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: 'Specialties fetched succesfully',
            data: result
        })
    }
)



const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await SpecialtyService.deleteSpecialty(id as string);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: 'Specialty deleted successfully',
            data: result
        })
    }
)


export const SpecialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}