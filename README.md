Here is the instructions how to start the web app:
1. After opening this folder in your vs code just go to the terminal and run "npm install" to install the dependencies.

2. Start the two local json-servers in two different terminal.

3. You can start the two json-servers by running the "npx json-server --watch db.json --port 5000" command.

4. Make sure that the two servers that are running should be on different port.

5. For example: if you run the command  "npx json-server --watch db.json --port 5000" for db.json, then run the "npx json-server --watch db.json --port 8000" for userdb.json.

<!(-- 6. Don't change the port number otherwise the web app will not work properly. --) IMPORTANT>.

7. After running the json-servers successfully open add the third terminal.

8. Run the "npm run dev" in the terminal.

9. After this you can access all the app.

10. You can click on login button and if you are not a user just click on sign up.

11. After signing up you can create, read, update, delete and register for any event.

12. Without logging in these funstionalities will not work.

13. After logging out you can log in because you are a registered user.

14. The web app is fully responsive for all the devices.

15. The only two features that are not implemented are filter events based on keywords and the calendar view.


