const HeaderContent = ({ title, description }) => {
  return (
    <div className="space-y-4 mb-4 sm:mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-primary-800 dark:text-primary-200 text-sm">
        {description}
      </p>
    </div>
  );
};

export default HeaderContent;
