CREATE DATABASE prelim;

CREATE TABLE "User"(
    -- attributes
    user_id SERIAL PRIMARY KEY,
    email varchar(50) UNIQUE NOT NULL,
    name varchar(20) NOT NULL,
    surname varchar(20)


);

CREATE TABLE Project(
    --attributes
    project_id SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL,
    body TEXT NOT NULL,
    status varchar(10) NOT NULL,
    assigner INT NOT NULL,
    
    --Integrity constraints
    CHECK (status = 'active' OR status =  'inactive' OR  status = 'declined' OR  status = 'completed'),
    FOREIGN KEY (assigner) REFERENCES "User" (user_id)
);

CREATE TABLE Task(
    --attributes
    task_id SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL,
    description TEXT NOT NULL,
    score INT NOT NULL ,
    status varchar(10) NOT NULL,
    assigner INT NOT NULL,
    project INT NOT NULL,

    --Integrity constraints
    CHECK (score >= 0),
    CHECK (status = 'active' OR status =  'inactive' OR  status = 'declined' OR  status = 'completed'),
    FOREIGN KEY (assigner) REFERENCES "User" (user_id),
    FOREIGN KEY (project) REFERENCES Project (project_id)
);

CREATE TABLE task_assignment(
    --attributes
    task_id INT,
    user_id INT,

    --Integrity constraints
    PRIMARY KEY (task_id, user_id),
    FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE project_assignment(
    --attributes
    project_id INT,
    user_id INT,

    --Integrity constraints
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES Project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);