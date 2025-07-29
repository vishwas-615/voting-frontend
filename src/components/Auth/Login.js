import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: ''},
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const { data } = await loginUser(values);
        login(data);
        navigate('/dashboard');
      } catch (err) {
        setErrors({ general: err?.response?.data?.message || 'Login failed' });
      }
    }
  });

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>Login</Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField label="Email" fullWidth margin="normal" name="email"
            type="email" value={formik.values.email} onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField label="Password" type="password" fullWidth margin="normal" name="password"
            value={formik.values.password} onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box my={2}>
            <Button fullWidth variant="contained" type="submit">Login</Button>
          </Box>
          <Typography color="error">{formik.errors.general}</Typography>
          <Box mt={2}>
            <Typography>
              New user? <a href="/register">Register here.</a>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
