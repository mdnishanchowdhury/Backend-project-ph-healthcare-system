export interface ICreateDoctorPayload {
    password: string;
    doctor: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        registrationNumber: string;
        experience?: number;
        gender: any;
        appointmentFee: number;
        qualification: string;
        currentWorkingPlace: string;
        designation: string;
    }
    specialties: string[];
}