import { Link } from "react-router-dom";
import Box from "../../components/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const Article = ({ article, actions }) => {
  const { username, isAdmin } = useAuth();
  const isDisabled = username !== article.author.username && !isAdmin;

  return (
    <Box size="small">
      <div className="flex justify-between items-center mb-1">
        <Link to={`/panel/base-de-conocimiento/${article.id}`}>
          <h2 className="text-lg font-bold hover:text-primary-900 dark:hover:text-primary-200">
            {article.title}
          </h2>
        </Link>
        {!isDisabled && (
          <div className="flex gap-4">
            <button
              title="Eliminar articulo"
              onClick={() => actions(article.id)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 hover:text-red-600"
              />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-gray-500 dark:text-primary-50 text-sm">
        <div>
          <p>
            <strong>Autor:</strong> <span>{article.author?.username}</span>
          </p>
          <p>
            <strong>Categoría :</strong> {article.category.name}
          </p>
        </div>
        <div>
          <p>
            <strong>Creado el:</strong>{" "}
            {new Date(article.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Box>
  );
};

export default Article;
