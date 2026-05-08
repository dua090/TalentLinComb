const KpiCard = ({
  title,
  value,
  icon,
  badge,
  iconBg,
  badgeStyle,
}) => {

  return (

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between mb-5">

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>

        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${badgeStyle}`}
        >
          {badge}
        </span>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
};

export default KpiCard;