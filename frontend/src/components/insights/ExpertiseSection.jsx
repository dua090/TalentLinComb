import ExpertiseCard from "./ExpertiseCard";
import EmptyState from "./EmptyState";

const ExpertiseSection = ({
  expertiseAreas,
}) => {

  const hasExpertise =
    expertiseAreas.length > 0;

  return (

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm xl:col-span-2">

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Key Expertise Areas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {hasExpertise ? (

          expertiseAreas.map(
            ([domain, count]) => {

              const formattedDomain =
                domain.replace(
                  "_",
                  " & "
                );

              return (

                <ExpertiseCard
                  key={domain}

                  title={formattedDomain}

                  desc={`${count} matching technical skills identified across candidate profiles`}
                />
              );
            }
          )

        ) : (

          <div className="col-span-3">

            <EmptyState text="No expertise insights available yet" />

          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertiseSection;