![Logo do Desafio](./desafio/header.png)

# StefaMon:
### StefaMon is a fight system with magical creatures, where players can battle to be the best trainer in the world. Win the battles and conquer your place in the ranking.

# Main Objectives:
- ### **Fix the various bugs present in the application**


- ### **Develop an application that follows coding best practices.;**
    - Api root must be ‘/api’; ex: localhost:8080/api/…
    - The endpoints must be in conformity with the correct HTTPs verbs.;
    - Must follow the single-responsability principle;


-   ### **Create the Java Entity 'Jogador' with the following attributes:**

    -   **Nickname**:
        -   Required;
        -   The nicknames must be unique;
    -   **Senha**:
        -   Required;
        -   Must be encrypted;
        -   Minimum size of 4 characters;
        -   Maximum size of 10 characters;
    -   **Stefamons:**
        -   Stefamons List (ManyToMany);
    -   **Saldo**:
        -   Required;
        -   BigDecimal field type;
        -   Must have a default value (You choose)


-   ### **Create functionality of register a Player**
    -  Must follow the criteria of 'Jogador' entity:


-   ### **Create functionality that validates Login and Password saved in the database**
    -   Show error message (Your choice) if the login data was incorrect;
    -   Only registered players can battle;
    -   Only a simple validation is required, its not necessary to use any authentication framework;


-   ### **Create functionality to buy/choose Stefamons**
    -   Stefamon price must be the average of his attributed;
        -   This price is not persisted in database, it must be calculated in runtime and can be implemented as you want;
    -   The player can have a maximum of 6 Stefamons, and have at least one to battle;
    -   Can be made during the register or after;


-   ### **Create battle functionality (can be implemented as you choose) respecting the following rules:**
    - **The battle is composed of the stefamons of each player**
      - Ex: Player 1 has 4 Stefamons X Player 2 has 6 StefaMons
    - **Create battle functionality against other players**
        -   Both players must be registered and have stefamons;
        -   Implement a logic to win coins (Increase player balance)
    - **Create battle functionality agains a BOT;**
        -   Bot will always have 6 stefamons;
        -   (Optional) Implement a logic to win coins (Increase player balance)
    - **Show the player winner and the loser**  
      - It cannot be a draw, the battle logic must always choose a winner;
    - **Must use at least 1 required stefamons attribute in the battle logic;**
    
    <br/>
    
    - **Obs:** 
      - Basically just do the battle logic. Choose a opponent, do the battle logic and show the winner;
      - In addition to the required objectives (Described above) it'll be considered the extras objectives (Described bellow) and it will only be evaluated if all the required objectives was concluded.
      - Battle ideas: [Instructions](./Instruções.md)

---
# Extras:
-   ### **Create a player ranking**
    -   Show ranking of players who had the most wins;
-   ### **Show battle Log;**
    -   Defenses and Attacks moves from each Stefamon
    -   Defeats of each Stefamon;
-   ### **Show battle history;**
    -   Show each battle from a players, and its wins and losses;
    -   Preferencialmente apresentando o LOG de batalha também;
-   ### **Redirect a user when acessing a non-existent page (Not Found);**
-   ### **Develop more functionalities at your choice;**
    -   Feel free to develop more functionalities at your choice for the challenge. But remember the it will be only evaluated if the main objectives was concluded.
---

# Tables:
- ### **Player:**
    -   **id:** BigInt
    -   **Nickname:** Varchar
    -   **Senha:** Varchar
    -   **Saldo:** BigDecimal
  
- ### **Player_Stefamon**
    -   **IdJogador:** BigInt
    -   **IdStefaMon:** BigInt

## Domain Classes (read only):

- ###   **StefaMon**:
    -   **Id:** (It's not a logic attribute)
    -   **Nome:** (It's not a logic attribute)
    -   **Vida:** (**Required** to battle logic)
    -   **Ataque:** ((**Required** to battle logic)
    -   **Defesa:** ((**Required** to battle logic)
    -   **Inteligência:** (Optional attribute to battle logic)
    -   **Poder:** (Optional attribute to battle logic)
    -   **Velocidade:** (Optional attribute to battle logic)

Game based on:
[https://www.tuxemon.org/](https://www.tuxemon.org/)

---

# Project Architecture
- [Architectural Instructions](./Instruções.md)

### Prerequisites *required*:
 - Git
 - JDK 11+
 - Maven 3.8.1
 - MySql/MariaDB

### Prerequisites *optional*:
 - Docker (If you want to use the MySQL)
 - Docker Compose (Normally comes with the Docker)

## Run the application in development mode

## Docker
**Remembering that these commands are in the terminal inside the folder _"./src/main/docker"_**
<br/><br/>
And if  you want to use the docker MySQL:<br/>
<small>Obs: Don't use "-d" flag if you want to see the docker terminal.</small>
```
docker-compose up -d 
```
<br/>

And to stop the docker container:<br/>
<small>Obs: Don't need it if you haven't used the "-d"</small>
```
docker-compose down
```

## Maven
**Remembering that you need MySQL already running!**<br/>

Use the following command to start the server:<br/>
<small>Obs: This command must be executed inside the project _root_ </small>
```shell script
./mvnw clean compile quarkus:dev
```


#### Related Tutorials:
- Maven ([tutorial](https://maven.apache.org/what-is-maven.html))
- Hibernate ORM (JPA Implementation) ([tutorial](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html))
- RESTEasy JAX-RS ([tutorial](https://docs.jboss.org/resteasy/docs/3.0.9.Final/userguide/html_single/index.html))
- MySQL ([tutorial](https://dev.mysql.com/doc/))

Optionals:
- Docker([tutorial](https://docs.docker.com/))
