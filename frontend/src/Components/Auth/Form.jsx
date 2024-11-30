import React, { useState } from "react";
import {
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

// Define validation schema
const registerSchema = yup.object().shape({
  username: yup.string().required("required").min(3, "Username must be at least 3 characters"),
  password: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  birthDate: yup.date().required("required"),
  gender: yup.string().required("required"),
  city: yup.string().required("required"),
  address: yup.string().nullable(), // Optional field
  email: yup.string().email("invalid email").required("required"),
  role: yup.string().oneOf(["Manager", "Fan"], "Invalid Role").required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

// Initial form values
const initialValuesRegister = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  city: "",
  address: "",
  email: "",
  role: "Fan", // Default role
};

const initialValuesLogin = {
  username: "", // Add username field for login
  password: "",
};

export default function Form() {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 800px)");
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // Handle form submission (no actual API call)
  const handleFormSubmit = async (values) => {
    console.log("Form Submitted", values);
  };

  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gap="30px"
            sx={{
              " & > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
              backgroundColor: "#f4f4f9",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isLogin ? (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={values.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.birthDate && Boolean(errors.birthDate)}
                  helperText={touched.birthDate && errors.birthDate}
                  InputLabelProps={{ shrink: true }} // Ensures the label stays above the input
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Gender"
                  name="gender"
                  select
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                  label="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Email Address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Role"
                  name="role"
                  select
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                >
                  <MenuItem value="Fan">Fan</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </TextField>
              </>
            )}
            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: "green",
                  color: "#fff",
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: "#007bff", // Blue text
                  "&:hover": {
                    cursor: "pointer",
                    color: "#0056b3", // Darker blue on hover
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
}
