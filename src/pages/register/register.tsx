import { FC, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./register.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";


const Register: FC = () => {
	const [firstname, setfirstName] = useState(null)
	const [lastname, setlastName] = useState(null)
	const [email, setEmail] = useState(null)
	const [birthday, setBirthday] = useState(null)
	const [phone, setPhone] = useState(null)
	const [userName, setUserName] = useState(null)
	const [password, setPassword] = useState(null)


	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleButtonClick = async (e: any) => {
		e.preventDefault()
		console.log({
			firstname, lastname, email, birthday, phone, userName, password
		});
		try {
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/authentication/register`, {
				firstname, lastname, email, birthday, phone, userName, password
			})
			console.log(response.data);

			navigate("/login", { replace: true });
		} 
		catch (error: any) {
			console.log('err', error)
			toast("You have errors.Check it!");
		}
	}

	return (
		<><div className="auth-wrapper">
			<div className="auth-inner">
				<Container>
					<h3>Register</h3>
					<Row>
						<Col><label>First Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="First Name"
								onChange={(e) => setfirstName(e.target.value)}
							/>
						</Col>
						<Col><label>Last Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Last Name"
								onChange={(e) => setlastName(e.target.value)}
							/>
						</Col>
					</Row>
					<Row>
						<Col><label>Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Col>
						<Col><label>Birthday</label>
							<input
								type="date"
								className="form-control"
								placeholder="Birthday"
								onChange={(e) => setBirthday(e.target.value)}
							/>
						</Col>
					</Row>

					<Row>
						<Col>
							<label>Phone</label>
							<input
								type="text"
								className="form-control"
								placeholder="Phone"
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<label>Username</label>
							<input
								type="email"
								className="form-control"
								placeholder="Username"
								onChange={(e) => setUserName(e.target.value)}
							/>
						</Col>
					</Row>


					<Row>
						<Col>
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
							/></Col></Row>


					<br></br>
					<div className="d-grid">
						<Button type="submit" variant="primary" onClick={(e) => handleButtonClick(e)} >
							Register
						</Button>
					</div>

					<p className="notice-text text-right">
						Have an account  <Link to="/login">Login</Link>
					</p>

				</Container>
			</div></div>
			<ToastContainer />
		</>
	)
}

export default Register