import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Input } from "../../components/Components";
import styled from "styled-components";
import { color } from "../../utils/Color";
import { IconLogo } from "../../assets/Assets";
import { HashLoader } from "react-spinners";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRegister } from "../../hooks";
import { toaster } from "../../components/ui/toaster";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { mutate: register, isPending: loading } = useRegister();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    register(formData, {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        toaster.create?.({
          title: "Registration successful.",
          type: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/home");
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || "Signup failed.";
        setError(msg);
      },
    });
  };

  return (
    <Container>
      <div>
        <img width={80} height={63.72} src={IconLogo} alt="logo" />

        <Text mt={8} fontSize="2xl" fontWeight="bold" color={color.text}>
          Create note now!
        </Text>
        <Text fontSize="md" color={color.text}>
          Never lose any idea again. Let’s sign up!
        </Text>

        <form onSubmit={submitHandler}>
          <Box margin="1.5rem" />
          <HashLoader color={color.btn} loading={loading} />
          {error && (
            <Text color="#f04848" fontWeight="semibold" mt={4}>
              {error}
            </Text>
          )}
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

          <Flex align="center" gap={5}>
            <Button size="lg" type="submit" bg={color.btn} color="white">
              Sign up
            </Button>

            <Link to="/signin">
              <Text color="white">Sign in</Text>
            </Link>
          </Flex>
        </form>
      </div>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${color.nav};
`;
