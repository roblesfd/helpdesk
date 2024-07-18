import { useParams } from "react-router-dom";
import { useGetAnArticleQuery } from "../../articles/articlesApiSlice";

const KnowledgeBaseArticle = () => {
  const { id } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAnArticleQuery(id);
  let content;

  if (isLoading) content = <p className="py-6">Cargando...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    content = (
      <div className="w-auto mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>Por {article.author?.username}</p>
            <div>
              <p>Creado: {new Date(article.createdAt).toLocaleDateString()}</p>
              <p>
                Actualizado: {new Date(article.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div
          className="prose my-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
        <div className="mb-4">
          <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-2">
            {article.category.name}
          </span>
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded mr-2"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default KnowledgeBaseArticle;
