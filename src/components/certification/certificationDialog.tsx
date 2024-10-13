import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addCertificationToUser } from "../../services/UserInfoController"; // Import your function to handle the API call
import { setTokens } from "../../features/auth/authSlice";
import { RootState } from "../../store/store";
interface IDialogWithFormProps {
  handleOpen: any;
  open: boolean;
}

const CertificationDialog: React.FC<IDialogWithFormProps> = ({
  handleOpen,
  open,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.authStore);
  const dispatch = useDispatch();

  const [certificationInfo, setCertificationInfo] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCertificationInfo(e.target.value);
  };

  const handleAddCertification = async () => {
    const response = await addCertificationToUser(
      userInfo.email,
      certificationInfo
    );
    dispatch(
      setTokens({
        accessToken: "access_token",
        email: response.email,
        userInfo: response,
      })
    );
    if (response) {
      handleOpen(); // Close the dialog if response is successful
    }
  };

  return (
    <>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[42rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Certification/Achievement
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Please enter your certification or achievement details.
            </Typography>
            <Textarea
              label="Certification/Achievement"
              size="lg"
              value={certificationInfo}
              onChange={handleInput}
              rows={4} // Adjust the number of rows as needed
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleAddCertification}
              fullWidth
            >
              Add Certification
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default CertificationDialog;
