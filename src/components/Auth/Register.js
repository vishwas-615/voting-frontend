import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchLocations, registerUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
  userName: Yup.string().min(2).required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile').required('Required'),
  fullName: Yup.string().min(2).required('Required'),
  AdharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Invalid Aadhar').required('Required'),
  password: Yup.string().min(8).required('Required'),
  location: Yup.string().required('Select location'),
});

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await fetchLocations();
      console.log("Locations fetched:", data);
      const locationNames = data.map(location => location.name);
      setLocations(locationNames || []);
    })();
  }, []);

  const formik = useFormik({
    initialValues: {
      userName: '', email: '', mobileNumber: '', fullName: '',
      AdharNumber: '', password: '', location: '',
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const { data } = await registerUser(values);
        console.log("User registered:", data);
        login({...data, location: values.location});
        navigate('/dashboard');
      } catch (err) {
        setErrors({ general: err?.response?.data?.message || 'Registration failed' });
      }
    },
  });

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>Register</Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField label="User Name" fullWidth margin="normal" name="userName"
            value={formik.values.userName} onChange={formik.handleChange}
            error={formik.touched.userName && !!formik.errors.userName}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <TextField label="Email" fullWidth margin="normal" name="email"
            type="email" value={formik.values.email} onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField label="Mobile Number" fullWidth margin="normal" name="mobileNumber"
            value={formik.values.mobileNumber} onChange={formik.handleChange}
            error={formik.touched.mobileNumber && !!formik.errors.mobileNumber}
            helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
          />
          <TextField label="Full Name" fullWidth margin="normal" name="fullName"
            value={formik.values.fullName} onChange={formik.handleChange}
            error={formik.touched.fullName && !!formik.errors.fullName}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField label="Aadhar Number" fullWidth margin="normal" name="AdharNumber"
            value={formik.values.AdharNumber} onChange={formik.handleChange}
            error={formik.touched.AdharNumber && !!formik.errors.AdharNumber}
            helperText={formik.touched.AdharNumber && formik.errors.AdharNumber}
          />
          <TextField label="Password" type="password" fullWidth margin="normal" name="password"
            value={formik.values.password} onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            select label="Location" fullWidth margin="normal" name="location"
            value={formik.values.location} onChange={formik.handleChange}
            error={formik.touched.location && !!formik.errors.location}
            helperText={formik.touched.location && formik.errors.location}
          >
            {locations.map((loc) => (
              <MenuItem value={loc} key={loc}>{loc}</MenuItem>
            ))}
          </TextField>
          <Box my={2}>
            <Button fullWidth variant="contained" type="submit">Register</Button>
          </Box>
          <Typography color="error">{formik.errors.general}</Typography>
          <Box mt={2}>
            <Typography>
              Already registered? <a href="/login">Login here.</a>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
