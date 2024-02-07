## Spark Hire full-stack development assignment
This repo contains the instruction for the completion of the **Software Engineer** assignment.

This assignment takes the form of a **small realistic project**, to be developed as a little **single-page app**.

It will be used to assess your skill levels, and also your ability to work with modern development tool and 
practices, such as Git/Github, Docker, etc...

**We expect you to dedicate between 4-5 hours of work to this exercise**. It's ok if not everything is perfect or 100% 
finished, the idea is not to spend a lot of time on this but rather to see what you can build in a few hours.

## The project: a candidates' disposition list
The goal is to build a small functional modern web application.

This application will allow a companie's hiring team to easily have access to candidates' dispostion.

Figma link here:

The application has one main model : `Candidate`. A `Candidate` has the following properties:

- A name (`text`, mandatory)
- An email (`text`, mandatory)
- A phone (`text`, optional)
- A created_at (`timestamp`, mandatory)

The secondary model `Disposition` is related to the `Candidate` model and has the following properties:

- A disposition (`undecided|hired|rejected`, mandatory)
- A hire_type (`internal|external`, mandatory if disposition is `hired`)
- A fee (`decimal(12,2)`, optional)
- A currency (`text`, mandatory if has a `fee`)
- A rejection_reason (`text`, mandatory if disposition is `rejected`)
- A created_at (`timestamp`, mandatory)

## Running the code

*This section should be updated with the required instructions to run your project*.


## Assignment tasks

### Must-have

In terms of features :

- [ ] Users should be able to view a list of all candidates' disposition,
- [ ] Users should be able to create a candidate information (with a name, email, and optional phone),
- [ ] Users should be able to edit the candidate information.
- [ ] Users should be able to set the disposition for a candidate (with a disposition and addtional properties)
- [ ] Users should be able to update the disposition for a candidate.

In terms of technical constraints :

- [ ] The whole codebase should be contained in a single repository available on GitHub, which should be a fork 
      of this repository
- [ ] The end result should be a single-page application
- [ ] `Javascript`, `React.js` v17+, `Bootstrap` v4.6+ should be used for the frontend. you can use `create-react-app` for quick start.
- [ ] `PHP` v8+, `Laravel` v10 should be used for the backend. You can use a Laravel starter kit for quick start.
- [ ] The application state should be stored in a `SQLite`, `PostgreSQL` or `MySQL` database.
- [ ] The frontend and the backend should communicate using a basic CRUD API.
- [ ] The app is styled with a few CSS rules, and should have a simple, usable UX (no time for fancy design stuff)
- [ ] There should be a small `README.md` file with the instructions needed to run the code locally

**Please note that this shouldn't be a multi-user application**. It does not need any kind of user management.

### Nice-to-have (if you have the time)

In terms of features :

- [ ] Users could be able to delete a candidate
- [ ] Users could be able to sort the list by candidate name, disposition, hire type, candidate created at and disposition created at.
- [ ] Users could benefit from a paginated list of candidates. See the controls on top of the table.
  - [ ] Display a control which would allow a specific number of candidates per page. 10 candidates per page should be the default.
  - [ ] Display a control for pagination with the number of pages available and controls to move to the next and previous page.
- [ ] Users could benefit from a responsive interface

Regarding the tech :

- [ ] The frontend and backend could use `GraphQL` as the API layer
- [ ] The backend could be easily run locally with `Docker` (`Dockerfile` + `docker-compose.yaml`)
- [ ] The codebase could contain a couple of automated tests

## Where to start :

1. Fork this repository
1. Write the project code (4-5 hours)
1. Commit & push your code every now and then - we expect to see a reasonable amount of commits
1. Update this `README.md` file with installation instructions (see "Running the code" above)
1. That's it - we'll review your work together once you are done
