CREATE TABLE agencies(
   id_agency COUNTER,
   address VARCHAR(250) NOT NULL,
   PRIMARY KEY(id_agency)
);

CREATE TABLE cars(
   id_car COUNTER,
   category VARCHAR(50),
   brand VARCHAR(50),
   model VARCHAR(50),
   plate_number VARCHAR(50),
   PRIMARY KEY(id_car)
);

CREATE TABLE user_profiles(
   id_user COUNTER,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   adress VARCHAR(50) NOT NULL,
   birth_date DATE,
   created_at DATE,
   updated_at DATE,
   PRIMARY KEY(id_user)
);

CREATE TABLE payments(
   id_payment COUNTER,
   paid_at DATE,
   price CURRENCY NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_payment),
   FOREIGN KEY(id_user) REFERENCES user_profiles(id_user)
);

CREATE TABLE comments(
   id_comment COUNTER,
   created_at DATE,
   type VARCHAR(50),
   content VARCHAR(1000) NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_comment),
   FOREIGN KEY(id_user) REFERENCES user_profiles(id_user)
);

CREATE TABLE locations(
   id_location COUNTER,
   start_city VARCHAR(50) NOT NULL,
   end_city VARCHAR(50) NOT NULL,
   start_date DATETIME NOT NULL,
   end_date DATETIME NOT NULL,
   status VARCHAR(50) NOT NULL,
   price CURRENCY NOT NULL,
   id_agency INT NOT NULL,
   id_payment INT,
   id_user INT NOT NULL,
   id_car INT NOT NULL,
   PRIMARY KEY(id_location),
   FOREIGN KEY(id_agency) REFERENCES agencies(id_agency),
   FOREIGN KEY(id_payment) REFERENCES payments(id_payment),
   FOREIGN KEY(id_user) REFERENCES user_profiles(id_user),
   FOREIGN KEY(id_car) REFERENCES cars(id_car)
);