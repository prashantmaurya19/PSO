
| API               | Method | Body                                                                                                                                      | Description                    | Response                        | Security   |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------- | ---------- |
| /ur/register      | Post   | {<br>"email":string,<br>"password":string,<br>"username":string,<br>"firstname":string,<br>"lastname":string<br>}                         | create/register a <br>new user | {"status":"ok"}                 | open       |
| /ur/user/login    | Post   |                                                                                                                                           | login using httpbasic          | {"token":"TOKEN",status:string} | secure     |
| /ur/user          | Put    | {<br>"email":string,<br>"password":string,<br>"username":string,<br>"firstname":string,<br>"lastname":string,<br>"roles":\["roles"\]<br>} | update user details            | new user object                 | secure     |
| /ur/health/status | Get    |                                                                                                                                           | check service helth            | null                            | open       |
| /ur/user          | Get    |                                                                                                                                           | get user details               | user object<br>                 | secure     |
| /ur/user/verify   | Get    |                                                                                                                                           | verify jwt token               | {"username":string}             | secure<br> |
|                   |        |                                                                                                                                           |                                |                                 |            |


