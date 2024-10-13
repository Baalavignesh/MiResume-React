import { CardBody } from "@material-tailwind/react";
import {  Typography } from "@mui/material";

interface IProjectCardProps {
  data: IProject;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ data }) => {
  return (
    <div className="w-full flex-row border-2 border-gray-50 shadow-sm rounded-sm">
      <CardBody>
        <div className="flex flex-col">
          <p className="mb-2 text-blue-gray-800 text-xl">{data.heading}</p>
          <Typography color="gray" className="mb-2 font-normal">
            {data.subheading}
          </Typography>
          <Typography color="gray" className="mb-8 pt-4 font-normal">
            {data.description}
          </Typography>
        </div>
      </CardBody>
    </div>
  );
};

export default ProjectCard;
