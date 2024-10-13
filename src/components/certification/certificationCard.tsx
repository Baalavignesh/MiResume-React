import { CardBody } from "@material-tailwind/react";
import { Card, Typography } from "@mui/material";

interface ICertificationCardProps {
  data: any; // Assuming certification is a simple string
}

const CertificationCard: React.FC<ICertificationCardProps> = ({ data }) => {
  console.log(data)
  return (
    <div className="w-full flex-row border-2 border-gray-50 shadow-sm rounded-sm">
      <CardBody>
        <Typography color="gray" className="mb-8 font-normal">
          {data.certification}
        </Typography>
      </CardBody>
    </div>
  );
};

export default CertificationCard;
