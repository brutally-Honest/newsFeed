# NewsFeed

This is a fullstack appilcation in which admin can add categories for news feed and the users can view lastest news as well as news belonging to categories added by admin. Once the categories are added by admin, feed for those categories are fetched every 5 minutes and updated in the database.

## Role based Features

1. #### <u>Admin</u>

   - Add or delete category for news feeds.
   - View all news feeds based on category.

2. #### <u> User</u>
   - View all news feeds based on category.

## Highlights

| Task                        |       Implementation        |
| :-------------------------- | :-------------------------: |
| Cron Jobs                   |            Cron             |
| State Management            | React Context + userReducer |
| Client-side Routing         |      React-Router-Dom       |
| Client-side Form Validation |       Formik and Yup        |
| Password Encryption         |          BcryptJs           |
| User Authentication         |             JWT             |
| Server-side Validation      |      Express-Validator      |

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB database to store data

### Installation and Usage

1. `git clone https://github.com/brutally-Honest/newsFeed.git`
2. `npm install` in both server directory and client directory
3. `node index.js` in server directory and `npm run dev` in client directory
4. First account created is the admin and subsequent accounts created are users

Install the dependencies and start the server.
