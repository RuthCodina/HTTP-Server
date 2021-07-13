# How to run the Code.

## This is a Music HTTP server, developed with NodeJs, Express, JWT, Bcrypt and MongoDB.

## This serves has:
- CRUD
- Authentication
- private Routes.

## General Idea:
Generate an HTTP server that can be used in a SPA, which has protected routes and authentication, using tokens. 
No API has been used, but you will be able to add data to the database, taking into account the model/document of each one.

## Endpoints
 - /user
 - /user/:username
 - /user/:id
 - /songs
 - /songs/:id
 - /auth/signup
 - /auth/login

##To use this server is necessary to install MongoDb, mongo Compass, to see the DB and the depencies above mentioned.
###1. Initialize in the mongo console with the compand "mongod". You could do this from the windows console. And identify the port where Mongo is receiving  info, To connect to Compass to view the data you have created. 
###2. There are three collections, Users, Songs and Roles. Roles will be created automatically once the DB is started, and each song will be added according to the information you enter in the '/user' endpoint.
###3. The private routes are in the endpoint '/user', and the public routes are in the endpoint '/songs'.
###4. When you login, a token will be generated, which will expire in 20 minutes. As long as it is enabled, you will be able to enter the protected routes allowed by your created user. Also you have the opporutnity to signup.
###5. To indicate that you like a song you will have to go to the public endpoints '/songs/:id' and with a put request only add your name to the likes array(in JSON format). 


  <img height="200" src="./Assets/Screenhot_1.png" />


###5 There are paths that you will not be able to enter, such as deleting a song, editing it, or seeing the list of movies that a certain user likes. in others it will only ask you to be logged in.