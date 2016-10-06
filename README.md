

![Wireframe Schema SQL](Wireframe.png)


#### HTTP API

| action                             | CRUD   | verb | path                 |
| ----------------------------       | ------ | ---- | ---------------------|
| findUserByEmailOrcreateUser(userId)| create | post | /api/users/          |
| getUserById(userId)                | show   | get  | /api/users/:userId   |
| updateUser(userId, attrs)          | update | post | /api/users/:userId   |
| setAppointment(attrs)              | create | post | /api/appointments    |
| deleteAppointment(apptId)          | delete | post | /api/appointments    |
| updateAppointment(apptId)          | update | post | /api/appointments    |
| getAllAppointments(userId)         | show   | get  | /api/appointments    |
| getFreeSlotsByServiceId(serviceId) | show   | get  | /api/freeSlots/:serviceId|





<!-- LICENSE -->

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
<br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[mit-license]: https://opensource.org/licenses/MIT
