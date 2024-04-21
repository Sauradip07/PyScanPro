# Backend README

## Introduction

Welcome to our backend repository! This backend is built using Express.js and MongoDB, with additional functionality for optical character recognition (OCR) using Tesseract.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)
- Tesseract OCR (https://github.com/tesseract-ocr/tesseract)

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
```
  cd <project-directory>
```
3. Install dependencies using npm:
```bash

npm install
```
4. Make sure MongoDB is running on your local machine.
5. Install Tesseract OCR. Follow the instructions provided in the Tesseract OCR documentation for your operating system.

Configuration
1. Create a .env file in the root directory of the project.
2. Add the following environment variables to the .env file:

```
PORT=3000 # or any preferred port number
MONGODB_URI=<your-mongodb-uri>
```

Running the Server
To start the server, run the following command:

```
npm start

```
The server will start running on the port specified in the .env file

Using Tesseract OCR
This backend includes functionality for optical character recognition using Tesseract. To utilize this feature, you can make HTTP requests to the appropriate endpoints. Ensure that you have Tesseract properly installed and configured on your system.

Contributing
Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or create a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
