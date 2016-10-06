
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('agents').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('agents').insert({
          fisrtName: 'Yaseen',
          lastName: 'Hussain',
          phoneNumber: '5109442727'
          email: 'Yaseen.uc@gmail.com',
          imageUlr: 'https://avatars2.githubusercontent.com/u/17223371?v=3&s=400',
          availability: [
            {
               "day": "sunday",
               "hours": [{
                  "end": "22:00",
                  "start": "08:00"
               }]
            },
            {
               "day": "saturday",
               "hours": [{
                  "end": "22:00",
                  "start": "08:00"
               }]
            }
          ],
          password: '123'
        }),

        knex('agents').insert({
          fisrtName: 'Majid',
          lastName: 'Rahimi',
          phoneNumber: '4152655659'
          email: 'majid88rahimi@gmail.com',
          imageUlr: 'https://avatars0.githubusercontent.com/u/7544733?v=3&s=466',
          availability: [
            {
               "day": "monday",
               "hours": [{
                  "end": "17:00",
                  "start": "11:00"
               }]
            },
            {
               "day": "friday",
               "hours": [{
                  "end": "20:00",
                  "start": "08:00"
               }]
            }
          ],
          password: '333'
        }),

        knex('agents').insert({
          fisrtName: 'Mike',
          lastName: 'Abelson',
          phoneNumber: '4157077256'
          email: 'mikeadelson@yahoo.com',
          imageUlr: 'http://vignette2.wikia.nocookie.net/spongebob/images/3/33/Patrick_Star.svg/revision/latest?cb=20100724183918',
          availability: [
            {
               "day": "tuesday",
               "hours": [{
                  "end": "11:00",
                  "start": "4:00"
               }]
            },
            {
               "day": "thursday",
               "hours": [{
                  "end": "18:00",
                  "start": "06:00"
               }]
            }
          ],
          password: '777'
        })

      ])
    })
}
