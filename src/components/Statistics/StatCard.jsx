/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function StatCard({ loading, number, title, icon }) {
  return (
    <Card className="w-[2500px] h-[250px] shadow-white border border-zinc-200 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-1 text-[50px] font-medium text-gray-900 dark:text-white mb-2">
          {icon}
          {loading && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            )}
          {number}
        </div>
        <span className="text-md text-gray-500 dark:text-gray-400">
          {title}
        </span>
      </div>
    </Card>
  );
}

export default StatCard;
