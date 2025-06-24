import { HashLoader } from "react-spinners";
import { Box, Button, Container, Note } from "../../components/Components";
import { color } from "../../utils/Color";
import { Link } from "react-router-dom";
import { useAuth, useNotesQuery } from "../../hooks";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const user = useAuth();
  const userId = user?._id;

  const { data: notes, isLoading, error } = useNotesQuery(userId);

  const hasNotes = Array.isArray(notes) && notes.length > 0;

  return (
    <Container alignStart>
      <div>
        <HashLoader
          style={{ margin: "2rem auto" }}
          color={color.btn}
          loading={isLoading}
        />

        {error instanceof Error && (
          <h3 style={{ color: "#f04848", marginTop: "5rem" }}>
            {error.message || "Gagal memuat data"}
          </h3>
        )}

        {hasNotes && (
          <Link to="/create">
            <Button label="Create Note" style={{ margin: "1rem 1rem 0 0" }} />
          </Link>
        )}

        {hasNotes
          ? notes.map(({ _id, title, note, created }) => (
              <Link key={_id} to={`/edit/${_id}`}>
                <Note title={title} note={note} create={created} />
              </Link>
            ))
          : !isLoading && <EmptyState />}

        <Box margin="2rem" />
      </div>
    </Container>
  );
};

export default Home;
