const ExpertiseCard = ({
  title,
  desc,
}) => {

  return (

    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-900/50 transition">

      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h4>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>

    </div>
  );
};

export default ExpertiseCard;