import NavBar from "../shared/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MyAvatar } from "../assets";
import { RootState } from "../store/store";
import { Container } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EducationCard from "../components/education/educationCard";
import EducationDialog from "../components/education/educationDialog";
import ExperienceDialog from "../components/experience/experienceDialog";
import ExperienceCard from "../components/experience/experienceCard";
import ProjectCard from "../components/project/projectCard";
import ProjectDialog from "../components/project/ProjectDialog";
import CertificationCard from "../components/certification/certificationCard";
import CertificationDialog from "../components/certification/certificationDialog";
import MyFooter from "../shared/footer";

const MyProfile: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, email } = useSelector(
    (state: RootState) => state.authStore
  );

  const [educationOpen, setEducationOpen] = useState(false);
  const handleEducationOpen = () => setEducationOpen((cur) => !cur);

  const [experienceOpen, setExperienceOpen] = useState(false);
  const handleExperienceOpen = () => setExperienceOpen((cur) => !cur);

  const [projectOpen, setProjectOpen] = useState(false);
  const handleProjectOpen = () => setProjectOpen((cur) => !cur);

  const [certificationOpen, setCertificationOpen] = useState(false);
  const handleCertificationOpen = () => setCertificationOpen((cur) => !cur);

  return (
    <div>
      <NavBar></NavBar>
      <div className="bg-custom-gradient w-full h-44 relative">
        <img
          src={MyAvatar}
          className="w-40 absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full"
        />
      </div>
      <div className="mt-16 ">
        <p className="font-light text-3xl text-center flex justify-center items-center">
          {userInfo.name}
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="lg"
            className="ml-8 text-blue-400 text-2xl"
            color={``}
          />
        </p>
      </div>

      <Container maxWidth="lg">
        {/* <div className="border-0 rounded-md p-4 flex flex-col gap-4 mt-12"> */}
        <div>
          <p className="text-blue-gray-700 mt-12 font-light bg-gray-100 pl-4 items-center text-2xl p-4  border-b-2 mb-2">
            Social Link
          </p>
          <div className="flex gap-8">
            <div className="font-normal ml-4 text-xl py-4">
              <a
                href={userInfo.linkedin}
                target="_blank"
                className="text-blue-300 underline"
              >
                LinkedIn
              </a>
            </div>
            <div className="font-normal ml-4 text-xl py-4">
              <a
                href={userInfo.github}
                target="_blank"
                className="text-blue-300 underline"
              >
                GitHub
              </a>
              
            </div>
            <div className="font-normal ml-4 text-xl py-4">{userInfo.phone}</div>
            <div className="font-normal ml-4 text-xl py-4">{userInfo.email}</div>

          </div>
        </div>

        <div>
          <p className="text-blue-gray-700 font-light bg-gray-100 pl-4 items-center text-2xl p-4  border-b-2 mb-2">
            Skills
          </p>
          <div className="font-normal ml-4 text-xl py-6">{userInfo.skills}</div>
        </div>
        <div>
          <p className="text-blue-gray-700 font-light bg-gray-100 items-center text-2xl p-4 pl-4 border-b-2 mb-2">
            Technologies
          </p>
          <div className="font-normal ml-4 text-xl py-6">
            {userInfo.technologies}
          </div>
        </div>
        {/* </div> */}

        <div>
          <div className="text-blue-gray-700 font-light bg-gray-100 items-center text-2xl p-4 border-b-2 mb-2 flex justify-between ">
            Education
            <p
              className="font-light text-base bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
              onClick={() => {
                handleEducationOpen();
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add More
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {userInfo.education.map((education: IEducation, index: number) => {
              return <EducationCard data={education} key={index} />;
            })}
          </div>
        </div>

        <div>
          <div className="text-blue-gray-700 font-light bg-gray-100 items-center text-2xl p-4 border-b-2 mt-4 mb-2 flex justify-between ">
            Experience
            <p
              className="font-light text-base bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
              onClick={() => {
                handleExperienceOpen();
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add More
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {userInfo.experience &&
              userInfo.experience.length > 0 &&
              userInfo.experience.map(
                (experience: IExperience, index: number) => (
                  <ExperienceCard key={index} data={experience} />
                )
              )}
          </div>
        </div>

        <div>
          <div className="text-blue-gray-700 font-light bg-gray-100 items-center text-2xl p-4 border-b-2 mt-4 mb-2 flex justify-between ">
            Projects
            <p
              className="font-light text-base bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
              onClick={() => {
                handleProjectOpen(); // Replace with your function to open the project dialog
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add More
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {userInfo.projects &&
              userInfo.projects.length > 0 &&
              userInfo.projects.map((project: IProject, index: number) => (
                <ProjectCard key={index} data={project} />
              ))}
          </div>
        </div>

        <div>
          <div className="text-blue-gray-700 font-light bg-gray-100 items-center text-2xl p-4 border-b-2 mt-4 mb-2 flex justify-between ">
            Certifications
            <p
              className="font-light text-base bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
              onClick={() => {
                handleCertificationOpen(); // Replace with your function to open the certification dialog
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add More
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {userInfo.certifications &&
              userInfo.certifications.length > 0 &&
              userInfo.certifications.map(
                (certification: string, index: number) => (
                  <CertificationCard key={index} data={certification} />
                )
              )}
          </div>
        </div>
      </Container>

      <EducationDialog open={educationOpen} handleOpen={handleEducationOpen} />
      <ExperienceDialog
        open={experienceOpen}
        handleOpen={handleExperienceOpen}
      />
      <ProjectDialog open={projectOpen} handleOpen={handleProjectOpen} />

      <CertificationDialog
        open={certificationOpen}
        handleOpen={handleCertificationOpen}
      />

      <MyFooter />
    </div>
  );
};
export default MyProfile;
