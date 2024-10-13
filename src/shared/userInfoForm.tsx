import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import UserFormFields from "../constants/UserForm";
import { useNavigate } from "react-router-dom";
import {addUserData} from "../services/UserInfoController";
import { SetLocalUserInfo } from "../helper/localStorage";

interface IUserInfoFormProps {
  isOpen: boolean;
  handleOpen: any;
  currentUserInfo: IUserInfo;
  setCurrentUserInfo: any;
}
const UserInfoForm: React.FC<IUserInfoFormProps> = ({
  isOpen,
  handleOpen,
  currentUserInfo,
  setCurrentUserInfo,
}) => {
  let [currentFields, setCurrentFields] = useState<number>(0);
  let navigate = useNavigate();


  useEffect(() => {
    const saveUserData = async () => {
      await addUserData(currentUserInfo);
    };
    if (currentUserInfo.isComplete === "half" && isOpen) {
      saveUserData();
      navigate("/profile");
    }
  }, [currentUserInfo]);

  let handleFormField = async () => {
    console.log("form field");
    console.log(currentFields, UserFormFields.length);
    if (currentFields + 1 < UserFormFields.length) {
      currentFields = currentFields + 1;
      setCurrentFields(currentFields);
    } else {
      setCurrentUserInfo((prevUserInfo: IUserInfo) => ({
        ...prevUserInfo,
        isComplete: "half",
      }));
      SetLocalUserInfo(currentUserInfo);
    //   
    }
  };

  let handleInput = (e: any) => {
    const { name, value } = e.target;
    console.log(e.target.name, e.target.value);
    setCurrentUserInfo((prevUserInfo: IUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    // setUserInput(userData);
  }, []);

  return (
    <>
      <Dialog
        size="md"
        open={isOpen}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        dismiss={{
          enabled: false,
          outsidePress: false,
          escapeKey: false,
        }}
      >
        <Card className="mx-auto w-full max-w-[42rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {UserFormFields[currentFields].cardHeading}
            </Typography>
            <Typography
              className="mb-0 font-normal"
              variant="paragraph"
              color="gray"
            >
              {UserFormFields[currentFields].cardSubheading}
            </Typography>

            {UserFormFields[currentFields].fields.map(
              (field: UserFormField, index: number) => {
                return (
                  <div key={index}>
                    <Typography className="-mb-2 pl-1" variant="h6">
                      {field.title}
                    </Typography>
                    {/* @ts-ignore */}

                    <Input
                      label={field.label}
                      size="lg"
                      onChange={handleInput}
                      name={field.name}
                      value={
                        currentUserInfo[field.name as keyof IUserInfo] || ""
                      }
                    />
                  </div>
                );
              }
            )}

            <div className="-ml-2.5 -mt-3">{/* @ts-ignore */}</div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleFormField} fullWidth>
              {UserFormFields.length == currentFields + 1 ? "Finish" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default UserInfoForm;
