import * as yup from 'yup';
export const yupValidation = yup.object({
    fullname:yup.string().min(5,"Must contain 5 char"),
    email:yup.string().required("Email is required"),
    password:yup.string().required("password is req.").min(4, "Must contain 4 char"),
    confirmPassword:yup.string().required("Confirm password is req.")
})