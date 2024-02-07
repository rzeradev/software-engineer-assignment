### Spark Hire full-stack development assignment
This repo contains the instruction for the completion of the **Software Engineer** assignment.

This assignment takes the form of a **small realistic project**, to be developed as a little **single-page app**.

It will be used to assess your skill levels, and also your ability to work with modern development tool and 
practices, such as Git/Github, Docker, etc...

**We expect you to dedicate between 4-5 hours of work to this exercise**. It's ok if not everything is perfect or 100% 
finished, the idea is not to spend a lot of time on this but rather to see what you can build in a few hours.

### The project: a candidates' disposition list
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
