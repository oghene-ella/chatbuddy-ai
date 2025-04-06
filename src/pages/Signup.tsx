import { FC, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

const Signup: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate("/login");
    } catch (err) {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  return (
		<Container maxWidth="sm">
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Sign Up
				</Typography>
				{error && <Alert severity="error">{error}</Alert>}
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ mt: 3, width: "100%" }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="new-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="confirmPassword"
						label="Confirm Password"
						type="password"
						id="confirmPassword"
						autoComplete="new-password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={loading}
					>
						Sign Up
					</Button>
					<Box sx={{ textAlign: "center" }}>
						<Typography variant="body2">
							Already have an account?{" "}
							<Link
								to="/login"
								style={{ textDecoration: "underline" }}
							>
								Login
							</Link>
						</Typography>
					</Box>
				</Box>
			</Box>
		</Container>
  );
};

export default Signup; 