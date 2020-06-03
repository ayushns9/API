# API
A Node.js API server using the Express framework, Sequelize, and PostgreSQL database.

### Steps to run the server:- 
1. ```git clone https://github.com/ayushns9/API```
2. ```cd API```
4. run ```npm i```
3. run ```npm run start```

This will start the server on localhost on port 5000 or on a different port(if running on a virtual machine) which will be printed on the console.

## Api

### User

#### Get

* ```GET /API/users?name=name&limit=limit&page=page```   
This will return a JSON object with a list of uses whose either name or surname matches with the given name attribute in the request.      
__Note__: _One can choose to skip one or more arguements to skip that field while filtering. e.g. ```GET /API/users``` will return the list of all users._

#### Post
* ```POST /API/users?name=name&surname=surname&email=email```  
This will create the user with the specified attributes in the database and return the object or error if the the user instance was not created.  


### Project

#### Get

* ```GET /API/projects?name=name&desc=desc&nameAssigner=name_of_assigner&limit=limit&page=page```   
This will return a JSON object with a list of projects whose attributes matches with the attributes present in the request.    
#### Post
* ```POST /API/projects?name=name&body=body&status=status&assigner=assigner```  
This will create the project with the specified attributes in the database and return the object or error if the the project instance was not created.

## Pagination
The ```limit``` and ```page``` attributes in every POST request specifies the page number and the number of results the client wants in a given page. The returned object also contains the page and limit attributes for next and previous page if they exist.
One can also skip limit and page attributes to get the result without pagination.

