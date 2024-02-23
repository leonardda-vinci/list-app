Step 1: Clone the Repository

Open your terminal and navigate to the directory where you want to clone the repository. Then, run the following command:

bash
Copy code
git clone <https://github.com/d-nc3/Full-Stack-Developer-Exam-2-Valdezco>
Replace <repository-url> with the actual URL of the repository. for this code:  https://github.com/d-nc3/Full-Stack-Developer-Exam-2-Valdezco

Step 2: Navigate to the App Directory

Change your current directory to the newly cloned app:

cd <app-directory>
Replace <app-directory> with the name of the directory containing the React app.
----------------------------

Step 3: Install Dependencies

Run the following command to install the required dependencies:
npm install

This will install the necessary packages mentioned in the package.json file.
---------------------------

Step 4: Run the App

After the installation is complete, start the React development server:

npm start
This will launch the app in your default web browser at http://localhost:3000/. You should see the SpaceX Launch App with lazy-loaded images 

---------------------------

Step 5: Test the Lazy Loading

Scroll down to trigger lazy loading. The loader should appear when new data is being fetched.

----------------------------
Step 6: Stop the Development Server

To stop the development server, press Ctrl + C in the terminal where the server is running.

----------------------------