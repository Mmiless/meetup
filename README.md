# Meetup

## Build From Source

Requirements: 
- [Node](https://nodejs.org/en)
- [Python3](https://www.python.org/downloads/)
    

To start frontend:

- cd into front/meetup

````npm install````

````npm start````


To start backend:

- Create a virtual environment and activate.

````pip3 install -r requirements.txt````

- Start websocket server

````daphne -b 0.0.0.0 -p 8000 meetup.asgi:application````

- Start redis server

````redis-server````





