import React from "react";
import ClientNavBar from "../ClientNavBar";
import { Link, Outlet } from "react-router-dom";
import ClientFooter from "../ClientFooter";
import Accordion from "../../../components/Accordion";
import SearchBar from "../../../components/SearchBar";
import { useGetCategoriesQuery } from "../../articles/categoriesApiSlice";
import { useGetArticlesQuery } from "../../articles/articlesApiSlice";
import { useGetTagsQuery } from "../../articles/tagsApiSlice";

const KnowledgeBaseLayout = () => {
  const {
    data: categoriesData,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoriesQuery();

  const {
    data: tagsData,
    isLoading: isLoadingTags,
    isSuccess: isSuccessTags,
    isError: isErrorTags,
  } = useGetTagsQuery();

  const { data: articlesData, isSuccess: isArticlesSuccess } =
    useGetArticlesQuery();

  let categoryItems;
  let tagItems;
  let content;

  if (isSuccess && isArticlesSuccess && isSuccessTags) {
    const { entities } = articlesData;

    tagItems = tagsData.map((tag) => (
      <Link
        key={tag._id}
        className="px-3 py-1 bg-indigo-200 hover:bg-indigo-300 rounded-full text-sm font-semibold border border-indigo-400"
      >
        {tag.name}
      </Link>
    ));

    categoryItems = categoriesData.map((category) => {
      const articles = Object.values(entities).filter(
        (article) => article.category.name === category.name
      );

      const accordionContent = articles.map((article) => (
        <div className="mb-3">
          <Link to={`/articulos/${article.id}`} className="font-medium">
            {article.title}
          </Link>
        </div>
      ));

      return {
        title: category.name,
        content: accordionContent,
      };
    });

    content = (
      <Accordion
        items={categoryItems}
        bgColor="transparent"
        color="text-gray-900"
        size="small"
        bordered={false}
      />
    );
  }

  return (
    <div className="bg-indigo-50">
      <ClientNavBar />
      <div className="grid grid-cols-10 gap-4">
        {/* CONTENIDO DEL BLOG */}
        <main className="col-span-8  min-h-screen container mx-auto px-3 md:px-8 py-3 md:py-10">
          <Outlet />
        </main>
        {/* SIDE */}
        <aside className="bg-white col-span-2 min-h-screen px-3  border border-l-solid border-l-2 shadow-xl pt-8">
          {/* SEARCHBAR */}
          <div>
            <SearchBar />
          </div>
          {/* LISTA CATEGORIAS */}
          <div className="my-6">
            <h3 className="mb-4 font-semibold">Categorías</h3>
            {content}
          </div>
          {/* LISTA TAGS */}
          <div>
            <h3 className="mb-4 font-semibold">Etiquetas</h3>
            <div className="flex justify-start items-center gap-3 flex-wrap">
              {tagItems}
            </div>
          </div>
        </aside>
      </div>
      <ClientFooter />
    </div>
  );
};

export default KnowledgeBaseLayout;
