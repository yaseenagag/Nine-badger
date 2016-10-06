
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('services').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('services').insert({
          id: 1,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/virus-removal.png',
          title: 'VIRUS REMOVAL',
          description: 'We’ll sweep and check your PC for viruses and eliminate any possible threats that could be slowing you down. We will also focus on maintaining your PC’s security by taking care of viruses early to avoid file loss and data corruption.'
          }
        ),
        knex('services').insert({
          id: 2,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/Diagnostic-anf-repair.png',
          title: 'DIAGNOSTIC AND REPAIR',
          description: 'Stay up and running with a computer checkup and allow us to troubleshoot any issues that might be preventing your PC from performing at an optimal level.'
          }
        ),
        knex('services').insert({
          id: 3,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/Electronic-setup.png',
          title: 'ELECTRONIC SETUP',
          description: 'We provide hardware and software installation, while specifically focusing on ways to increase your PC’s efficiency and usability.'
          }
        ),
        knex('services').insert({
          id: 4,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/PC-Tune-up.png',
          title: 'PC TUNE-UP',
          description: 'We’ll adjust important settings and remove unwanted programs to get your PC feeling like new again.'
          }
        ),
        knex('services').insert({
          id: 5,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/printer-setup.png',
          title: '',
          description: ''
          }
        ),
        knex('services').insert({
          id: 6,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/printer-setup.png',
          title: 'PRINTER SETUP',
          description: 'We know how frustrating and confusing it is to setup a wireless printer. Our experts will not only setup and configure your new printer, but they will also teach you how to use all of its features and basic functions.'
          }
        ),
        knex('services').insert({
          id: 7,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/data-recovery.png',
          title: 'DATA BACKUP',
          description: 'You never think about data backup until it’s too late. We’ll help you securely backup and transfer your music, pictures and documents from your PC to the external storage you provide.'
          }
        ),
        knex('services').insert({
          id: 8,
          logoUrl: 'https://www.myvfix.com/wp-content/uploads/2016/03/WiFi-Solutions.png',
          title: 'WIFI SOLUTIONS',
          description: 'With our Wireless Networking solution we will install the necessary equipment to connect the devices to your new network. Also we will determine the possible problems on your current network.'
          }
        )
      ])
    }
  }
