import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string
}


const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })

    if (!data.user) {
        throw new Error("Failed tore register patient")
    }

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is Blocked");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is Deleted");
    }

    try {
        const patient = await prisma.$transaction(async (tx) => {
            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,
                    email: payload.email
                }
            })
            return patientTx;
        })

        return {
            ...data,
            patient
        }
    } catch (error) {
        console.log("Transaction error:", error);
        await prisma.user.delete({
            where: {
                id: data.user.id
            }
        })
        throw error;
    }
}

interface ILoginPatientPayload {
    email: string;
    password: string
}

const loginUser = async (payload: ILoginPatientPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is Blocked");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is Deleted");
    }

    return data;
}

export const AuthService = {
    registerPatient,
    loginUser
}