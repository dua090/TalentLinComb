import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import EmptyState from "./EmptyState";

const COLORS = [
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
];

// ================= COMMON STYLES =================

const chartContainerClass =
  "bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm";

const tooltipClass =
  "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg";

// ================= CUSTOM TOOLTIP =================

const CustomTooltip = ({
  active,
  payload,
  label,
}) => {

  if (
    !active ||
    !payload?.length
  ) {
    return null;
  }

  return (

    <div className={tooltipClass}>

      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </p>

      <p className="text-sm text-blue-600 dark:text-blue-400">
        Count: {payload[0].value}
      </p>
    </div>
  );
};

// ================= PIE TOOLTIP =================

const CustomPieTooltip = ({
  active,
  payload,
  totalProfiles,
}) => {

  if (
    !active ||
    !payload?.length
  ) {
    return null;
  }

  const percentage =
    (
      (
        payload[0].value /
        totalProfiles
      ) * 100
    ).toFixed(1);

  return (

    <div className={tooltipClass}>

      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {payload[0].name}
      </p>

      <p className="text-sm text-blue-600 dark:text-blue-400">
        Count: {payload[0].value}
      </p>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {percentage}% of total
      </p>
    </div>
  );
};

// ================= MAIN COMPONENT =================

const ChartsSection = ({
  darkMode,
  skillChartData,
  experienceData,
  totalProfiles,
}) => {

  const axisColor =
    darkMode
      ? "#9CA3AF"
      : "#6B7280";

  const strokeColor =
    darkMode
      ? "#374151"
      : "#E5E7EB";

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

      {/* SKILL CHART */}

      <div className={chartContainerClass}>

        <div className="mb-6">

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Top Skills Distribution
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Most common skills across candidates
          </p>
        </div>

        <div className="h-[320px]">

          {skillChartData.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={skillChartData}
              >

                <XAxis
                  dataKey="skill"
                  tick={{
                    fill: axisColor,
                  }}
                  stroke={strokeColor}
                />

                <YAxis
                  tick={{
                    fill: axisColor,
                  }}
                  stroke={strokeColor}
                />

                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

                <Bar
                  dataKey="count"
                  fill="#3B82F6"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>

          ) : (

            <EmptyState text="No skill analytics available yet" />

          )}
        </div>
      </div>

      {/* EXPERIENCE CHART */}

      <div className={chartContainerClass}>

        <div className="mb-6">

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Experience Breakdown
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Candidate experience distribution
          </p>
        </div>

        <div className="h-[320px] flex items-center justify-center">

          {totalProfiles > 0 ? (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={experienceData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine

                  label={({
                    name,
                    percent,
                  }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >

                  {experienceData.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  content={
                    <CustomPieTooltip
                      totalProfiles={
                        totalProfiles
                      }
                    />
                  }
                />
              </PieChart>
            </ResponsiveContainer>

          ) : (

            <EmptyState text="No experience analytics available yet" />

          )}
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;