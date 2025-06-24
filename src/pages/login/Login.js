import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Box, Input } from "../../components/Components";
import { color } from "../../utils/Color";
import { IconLogo } from "../../assets/Assets";
import { useLogin } from "../../hooks";
import { toaster } from "../../components/ui/toaster";
import { Button, Flex, Text } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { mutate: login, isPending: loading } = useLogin();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    login(formData, {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        toaster.create({
          title: "Logged in successfully.",
          type: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/home");
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || "Login failed.";
        setError(msg);
      },
    });
  };

  return (
    <Container>
      <div>
        <img width={80} height={63.72} src={IconLogo} alt="logo" />
        <Text mt={8} fontSize="2xl" fontWeight="bold" color={color.text}>
          Welcome back Denoter!
        </Text>
        <Text fontSize="md" color={color.text}>
          Quick sign in, Note we.
        </Text>

        <form onSubmit={submitHandler}>
          <HashLoader color={color.btn} loading={loading} />
          <Box margin="1rem" />
          {error && <h3 style={{ color: "#f04848" }}>{error}</h3>}
          <Box margin="1rem" />

          <Input
            required
            label="Your Email"
            type="email"
            name="email"
            placeholder="email@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Box margin="1rem" />

          <Input
            required
            label="Password"
            type="password"
            name="password"
            placeholder="*******"
            value={formData.password}
            onChange={handleChange}
          />
          <Box margin="1.5rem" />

          <Flex align={"center"} gap={5}>
            <Button size={"lg"} type="submit" bg={color.btn} color={"white"}>
              Sign in
            </Button>

            <Link to="/signup">
              <Text color={"white"}>Sign up</Text>
            </Link>
          </Flex>
        </form>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${color.nav};
`;
