import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { color } from "../../utils/Color";
import { Input, Box, Button, Textarea } from "../../components/Components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth, useCreateNote } from "../../hooks";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";

const CreateNote = () => {
  const user = useAuth();
  const userId = user?._id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", note: "" });
  const [error, setError] = useState("");

  const { mutate: createNote, isPending: loading } = useCreateNote();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    if (!userId) {
      setError("User not logged in.");
      return;
    }

    createNote(
      { userId, title: formData.title, note: formData.note },
      {
        onSuccess: () => {
          navigate("/home");
        },
        onError: (err) => {
          const message =
            err?.response?.data?.message || "Failed to create note.";
          setError(message);
        },
      }
    );
  };

  return (
    <Form onSubmit={submitHandler}>
      <Flex py={5} align={"center"} gap={5}>
        <IconButton
          bg={color.btn}
          color={"white"}
          onClick={() => navigate("/")}
        >
          <LuArrowLeft />
        </IconButton>
        <Text fontSize={"md"} color={"black"}>
          Create new Note
        </Text>
      </Flex>

      <HashLoader
        cssOverride={{ margin: "2rem 0" }}
        color={color.btn}
        loading={loading}
      />

      {error && <h3 style={{ color: "#f04848" }}>{error}</h3>}

      <Input
        required
        label="Title"
        type="text"
        name="title"
        placeholder="Anything..."
        value={formData.title}
        onChange={handleChange}
      />
      <Box margin="1rem" />

      <Textarea
        required
        label="Note"
        name="note"
        placeholder="Pour what in ur mind here..."
        value={formData.note}
        onChange={handleChange}
      />
      <Box margin="1.5rem" />

      <Button label="Save" type="submit" />
    </Form>
  );
};

export default CreateNote;

const Form = styled.form`
  width: 90vw;
  max-width: 768px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
