import { useEffect, useState } from "react";
import { Container, Divider, Fade } from "@mui/material";
import {
  Button,
  Step,
  Stepper,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import NavBar from "../shared/navbar";
import CustomButton from "../shared/button";
import UserInfoForm from "../shared/userInfoForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  AddMessageToThreads,
  AddMessageToThreadsCoverLetter,
  AddMessageToThreadsResume,
  CreateThread,
  RetrieveThreadMessages,
  RunThread,
} from "../services/OpenAI";
// import jobDescription from "../constants/jobDescription";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faGear,
  faIceCream,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { Rings } from "react-loader-spinner";

const Dashboard: React.FC = () => {
  const { userInfo, email } = useSelector(
    (state: RootState) => state.authStore
  );

  // const [outputFileName, setOutputFileName] = useState<string>("output.pdf");
  let [resumeLoading, setResumeLoading] = useState<boolean>(false);
  let [coverLoading, setCoverLoading] = useState<boolean>(false);

  let [jobDescription, setJobDescription] = useState<string>("");
  let [modalOpen, setModalOpen] = useState<boolean>(false);
  let [finalLatex, setFinalLatex] = useState<string>();
  let [coverLetter, setCoverLetter] = useState<string>();
  let [currentUserInfo, setCurrentUserInfo] = useState<IUserInfo>({
    email: "",
    name: "",
    gender: "",
    skills: "",
    technologies: "",
    isComplete: "",
    experience: [],
    projects: [],
    education: [],
    certifications: [],
  });

  let currentAssistant = "asst_4sDw2wvYdwqk6qVQpio1CDEq";
  let currentThread = "thread_Qb5fPLrF4CbW9cTpPJaaJ9Ny";

  let CreateOpenAI = async () => {
    // -------------------
    // Azure OpenAI
    // -------------------
    // await CreateAssistant();
    // await CreateThread();
    // await CreateandRunInitialMessage('asst_N02Yb2yzJYxaYgl6AnwNuZ6H', 'thread_VSmoQVio37zGxoNLCKfYdPzB');
    // await GetMessages();
    // -------------------
    // OPENAI
    // -------------------
    // await CreateAssistant();
    // Do these two to create a thread and feed in the latex template
    // let thread = await CreateThread();
    // await AddMessageToThreads(thread.id);
    // await RunThread('thread_VmDq96xyUgzahRnuL0V66lcO', 'asst_4sDw2wvYdwqk6qVQpio1CDEq');
    // await RetrieveThreadMessages('thread_VmDq96xyUgzahRnuL0V66lcO');
    // await CreateResume(userInfo, jobDescription);
  };

  useEffect(() => {
    console.log("dashboard screen");
    setCurrentUserInfo(userInfo);
    if (userInfo.isComplete == "new") {
      console.log("incomplete");
      setModalOpen(true);
    }

    CreateOpenAI();
  }, []);

  let handleOpen = () => {
    setModalOpen(!modalOpen);
  };

  let copyLatexContent = async () => {
    await navigator.clipboard.writeText(finalLatex!);
  };

  let copyCoverLetterContent = async () => {
    await navigator.clipboard.writeText(coverLetter!);
  };

  let generateResume = async () => {
    setResumeLoading(true);
    await AddMessageToThreadsResume(userInfo, jobDescription, currentThread);
    await RunThread(currentThread, currentAssistant);
    let messages = await RetrieveThreadMessages(currentThread);
    const extractedLatex = messages.match(/```latex([\s\S]*?)```/)?.[1] ?? "";
    setFinalLatex(extractedLatex);
    setResumeLoading(false);
  };

  let generateCoverLetter = async () => {
    setCoverLoading(true);
    await AddMessageToThreadsCoverLetter(currentThread);
    await RunThread(currentThread, currentAssistant);
    let messages = await RetrieveThreadMessages(currentThread);
    setCoverLetter(messages);
    setCoverLoading(false);
  };

  //   const convertFile = async (event: React.FormEvent) => {
  //     event.preventDefault();
  // console.log(finalLatex)
  //     try {
  //       const response = await fetch("http://localhost:3000/convert", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ finalLatex, outputFileName }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       // Download the PDF file
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", outputFileName);
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode?.removeChild(link);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <div>
      <NavBar />
      <Fade in={true} timeout={1500}>
        <Container maxWidth="xl">
          <UserInfoForm
            isOpen={modalOpen}
            handleOpen={handleOpen}
            currentUserInfo={currentUserInfo}
            setCurrentUserInfo={setCurrentUserInfo}
          />
          <div className="mt-2">
            <h1 className="font-light text-4xl text-center py-12 text-gray-800">
              Create Resume and Cover Letter
            </h1>
            <Typography
              className="mb-3 pl-2 font-light text-3xl"
              variant="paragraph"
              color="black"
            >
              Paste the Job Description
            </Typography>
            {/* @ts-ignore */}
            <Textarea
              size="lg"
              rows={4}
              label="Job Description"
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <h1 className="font-light py-4">Resume</h1>
            {resumeLoading && (
              <div className="flex items-center">
                <span className="animate-pulse ml-8">
                  Generating your resume
                </span>
                <Rings
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="rings-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>

          <div className="w-full px-24 py-4">
            <Stepper>
              <Step>
                <FontAwesomeIcon icon={faGear} className="h-5 w-5" />

                <div className="absolute -bottom-[5.5rem] w-max text-center">
                  <Typography variant="h6" color={"blue-gray"}>
                    Step 1
                  </Typography>
                  <Button
                    disabled={resumeLoading}
                    onClick={generateResume}
                    className="mt-2"
                  >
                    Generate Resume
                  </Button>
                </div>
              </Step>
              <Step>
                <FontAwesomeIcon icon={faCopy} className="h-5 w-5" />
                <div className="absolute -bottom-[5.5rem] w-max text-center">
                  <Typography variant="h6" color={"blue-gray"}>
                    Step 2
                  </Typography>
                  <Button
                    disabled={resumeLoading}
                    onClick={copyLatexContent}
                    className="mt-2"
                  >
                    Copy Latex
                  </Button>
                </div>
              </Step>
              <Step>
                <FontAwesomeIcon icon={faLink} className="h-5 w-5" />
                <div className="absolute -bottom-[5.5rem] w-max text-center">
                  <Typography variant="h6" color={"blue-gray"}>
                    Step 3
                  </Typography>
                  <Button
                    disabled={resumeLoading}
                    onClick={() =>
                      window.open(
                        "https://www.overleaf.com/latex/templates/faangpath-simple-template/npsfpdqnxmbc",
                        "_blank"
                      )
                    }
                    className="mt-2"
                  >
                    Go OverLeaf
                  </Button>
                </div>
              </Step>
            </Stepper>
            <div className="mt-32 flex justify-between"></div>
          </div>

          <Divider />
          <div className="flex items-center">
          <h1 className="font-light py-4">Cover Letter</h1>
          {coverLoading && (
            
              <div className="flex items-center">
                <span className="animate-pulse ml-8">
                  Generating your cover letter
                </span>
                <Rings
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="rings-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>

          <div className="w-full px-24 py-4">
            <Stepper>
              <Step>
                <FontAwesomeIcon icon={faGear} className="h-5 w-5" />

                <div className="absolute -bottom-[5.5rem] w-max text-center">
                  <Typography variant="h6" color={"blue-gray"}>
                    Step 1
                  </Typography>
                  <Button
                    disabled={coverLoading}
                    onClick={generateCoverLetter}
                    className="mt-2"
                  >
                    Generate Cover Letter
                  </Button>
                </div>
              </Step>
              <Step>
                <FontAwesomeIcon icon={faCopy} className="h-5 w-5" />
                <div className="absolute -bottom-[5.5rem] w-max text-center">
                  <Typography variant="h6" color={"blue-gray"}>
                    Step 2
                  </Typography>
                  <Button
                    disabled={coverLoading}
                    onClick={copyCoverLetterContent}
                    className="mt-2"
                  >
                    Copy CoverLetter
                  </Button>
                </div>
              </Step>
              <Step>
                <FontAwesomeIcon icon={faLink} className="h-5 w-5" />
                <div className="absolute -bottom-[5.5rem] w-max text-center">
                  <Typography variant="h6" color={"blue-gray"}>
                    Step 3
                  </Typography>
                  <Button
                    disabled={coverLoading}
                    onClick={() =>
                      window.open(
                        "https://www.canva.com/design/DAGTbkVBOh0/_y_8ceFfOcMG-ZsNLxQJCg/edit?ui=eyJFIjp7IkE_IjoiQSIsIkEiOiIifX0&referrer=docs",
                        "_blank"
                      )
                    }
                    className="mt-2"
                  >
                    Go Canva
                  </Button>
                </div>
              </Step>
            </Stepper>
            <div className="mt-32 flex justify-between"></div>
          </div>

          <CustomButton label="Dummy Button" type="normal" color="primary" />
        </Container>
      </Fade>
    </div>
  );
};

export default Dashboard;
