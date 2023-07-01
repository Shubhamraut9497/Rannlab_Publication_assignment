# PDF Upload Project

This project allows users to upload PDF documents and perform various operations such as registration, login, file management, and PDF editing. It is built using HTML, CSS, JavaScript, React for the frontend, and Node.js, Express, and MongoDB for the backend.

## Features

- User Registration: Users can register by providing their name, email, password, photo, and file.
- User Login: Registered users can log in using their email and password.
- File Upload: Users can upload PDF files along with their registration.
- File Management: Users can view their previously uploaded files and download them.
- PDF Editing: Users can edit the uploaded PDF files by providing their name, education, and address.
- PDF Download: Users can download the edited PDF files.

## Technologies Used

- Frontend:
  - HTML
  - CSS
  - JavaScript
  - React

- Backend:
  - Node.js
  - Express.js
  - MongoDB

- Libraries/Frameworks:
  - bcryptjs: Password hashing and authentication
  - jwt: JSON Web Token for user authentication
  - pdf-lib: Manipulating PDF files
  - docxtemplater: Generating PDF files from DOCX templates

## Installation

1. Clone the repository: `git clone https://github.com/your-username/pdf-upload-project.git`
2. Navigate to the project directory: `cd pdf-upload-project`
3. Install dependencies for frontend and backend:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
4. Configure environment variables:
   - Create a `.env` file in the backend directory.
   - Add the following variables to the `.env` file:
     ```
     SECRET_KEY=shubhamrautraut124212shubham23raut43
     MONGO_URI=mongodb+srv://shubhamrautraut9497:4brX2omAoMRJFPUu@cluster9.vskvdbc.mongodb.net/
     ```
5. Start the application:
   - Frontend: `cd frontend && npm start`
   - Backend: `cd backend && npm start`

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the application.
2. Register a new user by providing the required information.
3. Log in using your registered email and password.
4. Explore the application and upload, edit, and download PDF files as needed.
5. On the PDF Data page, click the Edit button to open a form.
6. Enter your name, education, and address in the form and submit.
7. Return to the main page to see the updated PDF data.
8. Click the Download button to download the updated PDF.


## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please create an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
