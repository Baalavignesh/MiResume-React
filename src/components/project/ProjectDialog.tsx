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
import { addProjectToUser } from "../../services/UserInfoController"; // Ensure you have this service
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTokens } from "../../features/auth/authSlice";

interface IDialogWithFormProps {
  handleOpen: any;
  open: boolean;
}

const ProjectDialog: React.FC<IDialogWithFormProps> = ({
  handleOpen,
  open,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.authStore);
  const dispatch = useDispatch();

  let [projectInfo, setProjectInfo] = useState<IProject>({
    heading: "",
    subheading: "",
    description: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddProject = async () => {
    const response = await addProjectToUser(userInfo.email, projectInfo); // Ensure you have this function
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
              Add Project
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Please provide your project details.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Heading
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="Heading"
              size="lg"
              name="heading"
              onChange={handleInput}
            />
            <Typography className="-mb-2" variant="h6">
              Subheading
            </Typography>
            {/* @ts-ignore */}
            <Input
              label="Subheading"
              size="lg"
              name="subheading"
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
            <Button variant="gradient" onClick={handleAddProject} fullWidth>
              Add Project
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ProjectDialog;
