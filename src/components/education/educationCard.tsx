import { CardBody } from "@material-tailwind/react";
import { Card, Typography, Button } from "@mui/material";

interface IEducationCardProps {
  data: IEducation;
}

const EducationCard: React.FC<IEducationCardProps> = ({ data }) => {
  return (
    <div className="w-full flex-row border-2 border-gray-50 shadow-sm rounded-sm" >
      <CardBody>
        <div className="flex justify-between">
          <p className="mb-2  text-blue-gray-800  text-xl">{data.university}</p>

          <p className="mb-2  text-blue-gray-800  text-xl">{data.duration}</p>
        </div>

        <div className="flex justify-between">
          <Typography color="gray" className="mb-8 font-normal">
            {data.degree} - {data.grade}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {data.location}
          </Typography>
        </div>

      </CardBody>
    </div>
  );
};

export default EducationCard;
