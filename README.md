# PPIT_SN_DM

// User Authentication.
links https://www.youtube.com/watch?v=Ejg7es3ba2k

// Installs.
npm install react-bootstrap boostrap
npm install react-router-dom@5.2.0
npm install jsonwebtoken (installed both client and server side)
npm install jwt-decode (token decode)
npm install bcryptjs (Password encryption for DB viewing)

Mongo DB Login Details:
Email: svetlin.nachev@gmail.com
Password: ppit2022

Videos for TaskList and useState:
https://www.youtube.com/watch?v=TZ933D_RB8E&t=0s
https://www.youtube.com/watch?v=BkSco__Jpx8

Issues Encountered:

1. React Hook "useState" cannot be called in a class component.
Solve:
Because the state will store variable values. A function is appropriate for use. (reactjs.org/docs/hooks-state.html)