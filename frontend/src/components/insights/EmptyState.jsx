const EmptyState = ({
  text,
}) => {

  return (

    <div className="h-full flex items-center justify-center">

      <p className="text-sm text-gray-400 dark:text-gray-500">
        {text}
      </p>

    </div>
  );
};

export default EmptyState;