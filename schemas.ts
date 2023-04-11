import * as yup from "yup";

export const signupSchema = yup.object({
  // username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password  is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/,
      "password is too weak. password must be a combination of letters (uppercase and lowercase) numbers and special characters with 6 characters minimum."
    )
    .min(6),
  confirm_password: yup
    .string()
    .required("Re-enter your new password to confirm")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const signinSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup.string().required("Password  is required"),
});

export const uploadSchema = yup.object({
  title: yup.string().required("Title is required"),
  caption: yup.string().required("caption is required"),
  // author: yup.string().required("Author is required"),
});
