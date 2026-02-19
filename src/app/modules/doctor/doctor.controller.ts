import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsnc";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { DoctorService } from "./doctor.service";

const getAllDoctor = catchAsync(
    async (req: Request, res: Response) => {

        const result = await DoctorService.getAllDoctors();

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor fetched successfully",
            data: result
        })
    }
)

// const updateDoctor
// const deleteDoctor //soft delete

export const DoctorController = {
    getAllDoctor,
}