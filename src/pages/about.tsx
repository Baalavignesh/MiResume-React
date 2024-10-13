import React from "react";
import { Container, Fade } from "@mui/material";
import MyNavbar from "../shared/navbar";
import { r1, r2, ai1, reliable } from "../assets";
import aboutus from "../constants/aboutus";
import MyFooter from "../shared/footer";

const About: React.FC = () => {
  return (
    <div>
      <MyNavbar />

      <Fade in={true} timeout={1000}>
        <div className="flex flex-col w-full h-full bg-gray-100">
          <div className="bg-white">
            {" "}
            <div className="flex flex-col  justify-center items-center w-full bg-white">
              <h2 className="m-16 text-center text-3xl border-b-2 pb-3">
                Inside MiResume: The Technology Unleashed
              </h2>
              <img src={r1} className="h-64" />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 mx-20 content-start">
              {aboutus.map((about: any) => {
                return (
                  <ContentCard
                    heading={about.heading}
                    content={about.description}
                  />
                );
              })}
            </div>
          </div>

          <div className="px-32">
            <hr></hr>
            <div className="flex justify-around items-center p-12 pt-0 h-[60vh] gap-20 mx-16">
              <img src={r2} className="h-64" />
              <div className="flex flex-col gap-8">
                <div className="text-4xl font-medium">
                  The Role of Microsoft Azure AI in MiResume
                </div>

                <p className="w-11/12 text-xl ">
                  Microsoft Azure AI is integral to MiResume's effectiveness,
                  enabling the application to generate tailored resumes quickly
                  and efficiently. By leveraging Azure’s machine learning
                  capabilities, MiResume intelligently analyzes job descriptions
                  and user inputs to highlight relevant skills and experiences.
                </p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="px-32 bg-white">
            <hr></hr>
            <div className="flex justify-around items-center p-12 pt-0 h-[60vh] gap-20 mx-16">
              <div className="flex flex-col gap-8">
                <div className="text-4xl font-medium">
                  Future-Ready Features
                </div>

                <p className="w-11/12 text-xl ">
                  We continuously enhance MiResume with innovative features like
                  resume uploading, job qualification scoring, and customizable
                  LaTeX templates. Users can also scrape job descriptions from
                  LinkedIn or Handshake links to simplify the application
                  process.
                </p>
              </div>

              <img src={ai1} className="h-64" />
            </div>
          </div>
          <div className="px-32 ">
            <hr></hr>
            <div className="flex justify-around items-center p-12 pt-0 h-[60vh] gap-20 mx-16">
              <img src={reliable} className="h-64" />

              <div className="flex flex-col gap-8">
                <div className="text-4xl font-medium">
                  Real-Time Customization and Scalability
                </div>

                <p className="w-11/12 text-xl ">
                  The integration with Azure Cosmos DB allows for real-time
                  customization of resumes and cover letters, while Azure's
                  natural language processing enhances the extraction of key
                  information from job postings. With Azure's scalability and
                  reliability, MiResume delivers a user-friendly experience that
                  adapts to the needs of job seekers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <MyFooter />
    </div>
  );
};

export default About;

interface IContentCardProps {
  heading: string;
  content: string;
}
const ContentCard: React.FC<IContentCardProps> = ({ heading, content }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center  p-12 m-4 ">
      <div className="text-2xl font-medium">{heading}</div>
      <p className="text-center">{content}</p>
    </div>
  );
};
