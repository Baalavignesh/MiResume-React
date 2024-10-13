import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { addEducationToUser } from "../../services/UserInfoController";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTokens } from "../../features/auth/authSlice";

interface IDialogWithFormProps {
  handleOpen: any;
  open: boolean;
}

const EducationDialog: React.FC<IDialogWithFormProps> = ({
  handleOpen,
  open,
}) => {
  const { userInfo, email } = useSelector(
    (state: RootState) => state.authStore
  );

  let dispatch = useDispatch();

  let [educationInfo, setEducationInfo] = useState<IEducation>({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  let handleAddEducation = async () => {
    let response = await addEducationToUser(userInfo.email, educationInfo);
    dispatch(
      setTokens({
        accessToken: "access_token",
        email: response.email,
        userInfo: response,
      })
    );
    if (response) {
      handleOpen();
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
              Add Education
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Please provide your educational details.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              University
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="University"
              size="lg"
              name="university"
              onChange={handleInput}
            />
            <Typography className="-mb-2" variant="h6">
              Duration
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="Duration"
              size="lg"
              name="duration"
              onChange={handleInput}
            />
            <Typography className="-mb-2" variant="h6">
              Location
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="Location"
              size="lg"
              name="location"
              onChange={handleInput}
            />
            <Typography className="-mb-2" variant="h6">
              Degree
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="Degree"
              size="lg"
              name="degree"
              onChange={handleInput}
            />
            <Typography className="-mb-2" variant="h6">
              Grade
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="Grade"
              size="lg"
              name="grade"
              onChange={handleInput}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleAddEducation} fullWidth>
              Add Education
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default EducationDialog;
