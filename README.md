# MiResume

MiResume is an AI-powered application designed to help job seekers create tailored, professional resumes in under a minute. By leveraging Microsoft Azure AI and Cosmos DB, MiResume automatically highlights relevant projects and experiences to match specific job descriptions, saving time and maximizing your chances of landing the job.

## Table of Contents
- [Inspiration](#inspiration)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup](#setup)
- [Usage](#usage)
- [Challenges](#challenges)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [License](#license)

---

## Inspiration
Applying for part-time and summer internships is often time-consuming, especially for students balancing studies, projects, and other responsibilities. MiResume aims to streamline this process, enabling users to create customized resumes for specific job roles with minimal effort.

## Features
- **Personalized Resume Creation:** Tailors resumes to specific job descriptions by focusing on relevant skills and experience.
- **Quick Resume Generation:** Generates professional resumes and cover letters in under a minute using LaTeX formatting.
- **Data Storage & Management:** User information is stored securely in Azure Cosmos DB for efficient access and modification.
- **User-Friendly Interface:** Simple and intuitive interface for a seamless resume-building experience.
- **Real-Time Customization:** Quickly customizes resumes for different job applications on the go.

## Tech Stack
### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite.js**: A fast development build tool optimized for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: Used for making HTTP requests from the frontend.

### Backend Services
- **Microsoft Azure AI**: Powers the resume-building logic with machine learning and natural language processing capabilities.
- **Azure Cosmos DB**: Stores user information, enabling fast access for resume customization.

### Additional Tools
- **LaTeX**: Used for formatting and generating uniform, professional resumes.
- **OpenAI API**: Provides language processing capabilities for understanding job descriptions and tailoring content.

## Architecture
MiResume follows a client-server architecture where:
- **Frontend**: Developed with React, Vite.js, and Tailwind CSS, it interacts with Azure AI services to fetch and display customized resumes.
- **Backend Services**: No separate backend server; Microsoft Azure handles the AI processing and data storage through Cosmos DB, enabling direct and efficient access.

## Setup
To set up and run MiResume locally:
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/MiResume.git
   cd MiResume
   
## Usage
- **Input User Data**: Enter your projects, experiences, and skills into the application.
- **Customize Resume**: Paste a job description to allow the AI to tailor your resume based on the role requirements.
- **Download**: Generate and download the resume in a professional LaTeX template.

## Challenges
During the development of MiResume, we encountered some challenges:
- **Azure Configuration**: Setting up GPT-4o required version adjustments due to compatibility issues.
- **Quota Limits**: Initially faced limitations with API usage quotas, requiring temporary adjustments to continue development.
- **Learning Curve**: As this was our first project on Microsoft Azure, navigating the platform and understanding the various services involved a significant learning curve.

## Future Plans
We have several exciting features planned for future releases:
- **Resume Uploading**: Support for users to upload existing resumes for analysis.
- **Job Qualification Scoring**: AI-driven evaluation of the probability of qualifying for a job based on the provided resume.
- **Customizable Templates**: Allow users to upload or create custom LaTeX templates for more personalized resume styles.
- **Job Description Scraping**: Enable users to paste LinkedIn or Handshake links, automatically extracting job descriptions.

## Contributing
Contributions are welcome! If you have any ideas for new features or improvements, feel free to fork the repository, make changes, and submit a pull request.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**
