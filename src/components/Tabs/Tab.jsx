const Tab = ({ title, setActiveTab, activeTab, data }) => {
  return (
    <button
      className={`py-2 px-4 ${
        activeTab === data
          ? "border-b-2 border-primary-500 text-primary-500"
          : ""
      }`}
      onClick={() => setActiveTab(data)}
    >
      {title}
    </button>
  );
};

export default Tab;
