import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const raw = localStorage.getItem("user");
  try {
    return JSON.parse(raw)?.data || null;
  } catch {
    return null;
  }
};

const PROD_URL = "https://be-denote.vercel.app";

const fetchUserNotes = async (userId) => {
  const res = await axios.get(`${PROD_URL}/api/notes/user/${userId}`);
  return res.data.data._notes.reverse();
};

export const useNotesQuery = (userId) => {
  return useQuery({
    queryKey: ["notes", userId],
    queryFn: () => fetchUserNotes(userId),
    enabled: !!userId, // don’t run query until userId exists
    staleTime: 1000 * 60 * 5, // optional: 5 mins caching
  });
};

const createNote = async ({ userId, title, note }) => {
  const res = await axios.post(`${PROD_URL}/api/notes/create/${userId}`, {
    title,
    note,
  });
  return res.data;
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // refetch after create
    },
  });
};

const fetchNoteById = async (noteId) => {
  const res = await axios.get(`${PROD_URL}/api/notes/${noteId}`);
  return res.data.data;
};

export const useNoteById = (noteId) => {
  return useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
  });
};

const editNote = async ({ noteId, title, note }) => {
  const res = await axios.patch(`${PROD_URL}/api/notes/edit/${noteId}`, {
    title,
    note,
  });
  return res.data;
};

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

const deleteNote = async (noteId) => {
  const res = await axios.delete(`${PROD_URL}/api/notes/delete/${noteId}`);
  return res.data;
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

const loginUser = async ({ email, password }) => {
  const res = await axios.post(`${PROD_URL}/api/users/login`, {
    email,
    password,
  });
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

const registerUser = async ({ email, password }) => {
  const res = await axios.post(`${PROD_URL}/api/users/register`, {
    email,
    password,
  });
  return res.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
