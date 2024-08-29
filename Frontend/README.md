# KeyLogger Monitoring Application

## Description

This project is a full stack web application that monitors user activity on devices. It tracks key presses, takes screenshots, and monitors the clipboard, encrypting all captured data. The backend is built with Flask and handles session management and logout functionality. The frontend is developed using React, providing a user-friendly interface for monitoring activity and logging out.

## Features

- **User Activity Monitoring:** Tracks key presses, takes periodic screenshots, and captures clipboard data.
- **Encryption:** Encrypts all captured data to ensure user privacy and security.
- **User Authentication:** Allows users to log in and log out, with session management.
- **Gallery:** Displays a gallery of captured screenshots.

## Technologies Used

- **Frontend:** React, Axios
- **Backend:** Flask, Flask-CORS
- **Database:** Session management using Flask session
- **Other:** Docker for environment setup

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MHuzaifa191/keylogger-monitoring-app.git
   cd keylogger-monitoring-app
   ```

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create a virtual environment and activate it:
     ```bash
     python3 -m venv venv
     source venv/bin/activate   # On Windows use `venv\Scripts\activate`
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Flask app:
     ```bash
     flask run
     ```

3. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the React app:
     ```bash
     npm start
     ```

## Usage

1. **Start the backend server:**
   ```bash
   cd backend
   flask run
   ```

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm start
   ```

3. **Navigate to the application:**
   Open your web browser and go to `http://localhost:3000`.

## API Endpoints

- **`POST /logout`:** Logs out the user by clearing the session.


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspiration and resources for building this project were gathered from various online tutorials and documentation.
