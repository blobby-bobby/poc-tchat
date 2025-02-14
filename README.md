# Project: POC Chat Application

## Description

This project is a Proof of Concept (POC) for a chat application.
It demonstrates the efficiency of webSocket in Java and Angular to create a real-time chat.

## Technology Stack

- **Backend:** Java (Spring Boot)
- **Frontend:** Angular
- **Real-time Communication:** WebSockets
- **Build Tools:** Maven, npm

## Installing the project

1. Clone the repository :

```
git clone https://github.com/blobby-bobby/poc-tchat.git
```

2. Install the backend

```
cd /back
mvn clean install
```

3. Install the backend

```
cd /front
npm install
```

## Testing the chat

### With Postman

1. Run the back-end
2. In Postman, create a new connection, select `WebSocket`
3. In the connection URL, type `ws://localhost:8081/chat`
4. Click on the connect button
5. Type and send a message in the message tab

### In the user interface

1. Run the back-end
2. Run the front-end (`ng serve`)
3. Go to `localhost:4200` in your browser
4. Have fun 😊

---

You can find the available SQL script to generate the data model in this repository.
