import React from "react";
import HeaderContent from "../../components/HeaderContent";
import { Link } from "react-router-dom";
import {
  useDeleteArticleMutation,
  useGetArticlesQuery,
} from "./articlesApiSlice";
import Article from "./Article";
import toast from "react-hot-toast";

const ArticleList = () => {
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
  const [deleteArticle] = useDeleteArticleMutation();

  let content;

  const onDeleteArticleClicked = async (id) => {
    const result = await deleteArticle(id);

    if (result.error) {
      toast.error(result.error?.data?.message);
    } else {
      toast.success(result.data.message);
    }
  };

  if (isLoading) content = <p className="my-4">Cargando...</p>;

  if (isError) content = <p className="my-4">{error?.data?.message}</p>;

  if (isSuccess) {
    const { entities } = articles;

    content = Object.values(entities).map((article) => (
      <Article
        key={article._id}
        article={article}
        actions={onDeleteArticleClicked}
      />
    ));
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <HeaderContent
          title="Artículos"
          description="Descripcion sobre artículos"
        />
        <div className="#">
          <Link
            to="/panel/base-de-conocimiento/nuevo"
            className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transform transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            + Nuevo
          </Link>{" "}
        </div>
      </div>
      <section className="my-4 md:my-12">
        <div className="flex flex-col mt-6">{content}</div>
      </section>
    </>
  );
};

export default ArticleList;
