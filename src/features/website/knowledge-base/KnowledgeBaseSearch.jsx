import { Link, useLocation } from "react-router-dom";
import { useSearchForArticlesQuery } from "../../articles/articlesApiSlice";
import { useEffect, useState } from "react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const KnowledgeBaseSearch = () => {
  const query = useQuery().get("query");
  const [articles, setArticles] = useState([]);

  const {
    data: articleData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSearchForArticlesQuery(query);

  let content;

  useEffect(() => {
    if (isSuccess) setArticles([...articleData]);
  }, [isSuccess]);

  if (isLoading) content = <p className="my-4">Cargando...</p>;
  if (isError) content = <p className="my-4">{error?.data?.message}</p>;

  if (isSuccess) {
    content = Object.values(articleData).map((article) => (
      <div
        key={article._id}
        className="bg-white w-full shadow-lg mb-2 rounded-lg p-4"
      >
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        <div className="text-gray-700 text-xs mb-4">
          <p>{article.createdAt}</p>
          <p>Por {article.author?.username}</p>
        </div>
        <Link
          to={`/articulos/${article._id}`}
          className="text-indigo-500 hover:underline"
        >
          Leer más
        </Link>
      </div>
    ));
  }
  return (
    <>
      <h1 className="text-4xl md:mb-6 mb-10">
        Resúltados de búsqueda: <span className="italic">{query}</span>
      </h1>
      <section className="pt-10">
        {content.length === 0 ? (
          <p className="my-9 text-3xl font-medium italic">No hay resúltados</p>
        ) : (
          content
        )}
      </section>
    </>
  );
};

export default KnowledgeBaseSearch;
