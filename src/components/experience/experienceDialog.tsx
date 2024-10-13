import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { addExperienceToUser } from "../../services/UserInfoController";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTokens } from "../../features/auth/authSlice";

interface IDialogWithFormProps {
  handleOpen: any;
  open: boolean;
}

const ExperienceDialog: React.FC<IDialogWithFormProps> = ({
  handleOpen,
  open,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.authStore);
  const dispatch = useDispatch();

  let [experienceInfo, setExperienceInfo] = useState<IExperience>({});

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperienceInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddExperience = async () => {
    const response = await addExperienceToUser(userInfo.email, experienceInfo);
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
              Add Experience
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Please provide your work experience details.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Company
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="Company"
              size="lg"
              name="company"
              onChange={handleInput}
            />
            <Typography className="-mb-2" variant="h6">
              Role
            </Typography>
            {/* @ts-ignore */}
            <Input label="Role" size="lg" name="role" onChange={handleInput} />
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
              Description
            </Typography>
            <Textarea
              label="Description"
              size="lg"
              name="description"
              onChange={handleInput}
              rows={4} // Adjust the number of rows as needed
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleAddExperience} fullWidth>
              Add Experience
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ExperienceDialog;
