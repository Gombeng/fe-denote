import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { color } from "../../utils/Color";
import { Input, Box, Button, Textarea } from "../../components/Components";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteNote, useEditNote, useNoteById } from "../../hooks";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";

const EditNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading: isFetching,
    error: fetchError,
  } = useNoteById(noteId);

  const [formData, setFormData] = useState({ title: "", note: "" });
  const [error, setError] = useState("");

  const { mutate: editNote, isPending: isUpdating } = useEditNote();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        note: data.note,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    editNote(
      { noteId, title: formData.title, note: formData.note },
      {
        onSuccess: () => navigate("/home"),
        onError: (err) => {
          const msg = err?.response?.data?.message || "Failed to update note";
          setError(msg);
        },
      }
    );
  };

  const deleteHandler = () => {
    setError("");

    const confirmBox = window.confirm("Delete this poem?");
    if (!confirmBox) return;

    deleteNote(noteId, {
      onSuccess: () => navigate("/home"),
      onError: (err) => {
        const msg = err?.response?.data?.message || "Failed to delete note";
        setError(msg);
      },
    });
  };

  const loading = isFetching || isUpdating || isDeleting;

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
          Edit Note
        </Text>
      </Flex>

      <HashLoader
        cssOverride={{ margin: "2rem 0" }}
        color={color.btn}
        loading={loading}
      />

      {fetchError instanceof Error && (
        <h3 style={{ color: "#f04848" }}>{fetchError.message}</h3>
      )}

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

      <Button label="Save" type="submit" style={{ marginRight: "1rem" }} />
      <Button label="Delete" type="button" onClick={deleteHandler} />
    </Form>
  );
};

export default EditNote;

const Form = styled.form`
  width: 90vw;
  max-width: 768px;
  margin: 0 auto 2rem;
`;
