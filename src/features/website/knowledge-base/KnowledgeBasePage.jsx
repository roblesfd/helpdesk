import { Link } from "react-router-dom";
import { useGetArticlesQuery } from "../../articles/articlesApiSlice";

const KnowledgeBasePage = () => {
  const {
    data: articles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticlesQuery("articlesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p className="my-4">Cargando...</p>;

  if (isError) content = <p className="my-4">{error?.data?.message}</p>;

  if (isSuccess) {
    const { entities } = articles;

    content = Object.values(entities).map((article) => (
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
      <h1 className="text-4xl md:mb-6 mb-10">Artículos</h1>
      <section>{content}</section>
    </>
  );
};

export default KnowledgeBasePage;
