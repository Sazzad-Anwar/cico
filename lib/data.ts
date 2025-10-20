import dayjs from 'dayjs'
import { User } from '../store/auth.store'
import { Transfer } from '../store/data.store'
import uuid from 'react-native-uuid'

export const generateAccountNumber = () => {
  // Example: LR + 4 random digits + KA + 4 random digits
  const randomDigits = () => Math.floor(1000 + Math.random() * 9000).toString()
  return `LR${randomDigits()}KA${randomDigits()}`
}

export const generateTransactionId = () => {
  return `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const initialUsers: User[] = [
  {
    id: uuid.v4() as string,
    name: 'Annette Warrent',
    email: 'annette.warrent@example.com',
    phoneNumber: '+251911234567',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1990-05-15',
    nid: 'NID1234567890',
    kebeleId: 'KEB001',
    avatar: `https://picsum.photos/200?random=1`,
    deposit: [
      { type: 'ETB', amount: 2500 },
      { type: 'USD', amount: 1500 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Devon Walter',
    email: 'devon.walter@example.com',
    phoneNumber: '+251922345678',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1988-09-22',
    nid: 'NID2345678901',
    kebeleId: 'KEB002',
    avatar: `https://picsum.photos/200?random=2`,
    deposit: [
      { type: 'ETB', amount: 3000 },
      { type: 'USD', amount: 2000 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    phoneNumber: '+251933456789',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1992-12-08',
    nid: 'NID3456789012',
    kebeleId: 'KEB003',
    avatar: `https://picsum.photos/200?random=3`,
    deposit: [
      { type: 'ETB', amount: 4000 },
      { type: 'USD', amount: 2500 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Jonathon Michael',
    email: 'jonathon.michael@example.com',
    phoneNumber: '+251944567890',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1985-03-30',
    nid: 'NID4567890123',
    kebeleId: 'KEB004',
    avatar: `https://picsum.photos/200?random=4`,
    deposit: [
      { type: 'ETB', amount: 5000 },
      { type: 'USD', amount: 3000 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phoneNumber: '+251955678901',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1993-07-14',
    nid: 'NID5678901234',
    kebeleId: 'KEB005',
    avatar: `https://picsum.photos/200?random=5`,
    deposit: [
      { type: 'ETB', amount: 3500 },
      { type: 'USD', amount: 1800 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phoneNumber: '+251966789012',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1987-11-25',
    nid: 'NID6789012345',
    kebeleId: 'KEB006',
    avatar: `https://picsum.photos/200?random=6`,
    deposit: [
      { type: 'ETB', amount: 4500 },
      { type: 'USD', amount: 2200 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    phoneNumber: '+251977890123',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1991-04-03',
    nid: 'NID7890123456',
    kebeleId: 'KEB007',
    avatar: `https://picsum.photos/200?random=7`,
    deposit: [
      { type: 'ETB', amount: 2800 },
      { type: 'USD', amount: 1600 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    phoneNumber: '+251988901234',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1989-01-18',
    nid: 'NID8901234567',
    kebeleId: 'KEB008',
    avatar: `https://picsum.photos/200?random=8`,
    deposit: [
      { type: 'ETB', amount: 3200 },
      { type: 'USD', amount: 1900 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    phoneNumber: '+251999012345',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1994-06-12',
    nid: 'NID9012345678',
    kebeleId: 'KEB009',
    avatar: `https://picsum.photos/200?random=9`,
    deposit: [
      { type: 'ETB', amount: 2700 },
      { type: 'USD', amount: 1700 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    phoneNumber: '+251900123456',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1986-08-29',
    nid: 'NID0123456789',
    kebeleId: 'KEB010',
    avatar: `https://picsum.photos/200?random=10`,
    deposit: [
      { type: 'ETB', amount: 3800 },
      { type: 'USD', amount: 2300 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Jessica Brown',
    email: 'jessica.brown@example.com',
    phoneNumber: '+251901234567',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1992-02-17',
    nid: 'NID1357902468',
    kebeleId: 'KEB011',
    avatar: `https://picsum.photos/200?random=11`,
    deposit: [
      { type: 'ETB', amount: 4200 },
      { type: 'USD', amount: 2600 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Christopher Davis',
    email: 'christopher.davis@example.com',
    phoneNumber: '+251902345678',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1984-10-05',
    nid: 'NID2468013579',
    kebeleId: 'KEB012',
    avatar: `https://picsum.photos/200?random=12`,
    deposit: [
      { type: 'ETB', amount: 3600 },
      { type: 'USD', amount: 2100 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Amanda Garcia',
    email: 'amanda.garcia@example.com',
    phoneNumber: '+251903456789',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1995-12-21',
    nid: 'NID3691470258',
    kebeleId: 'KEB013',
    avatar: `https://picsum.photos/200?random=13`,
    deposit: [
      { type: 'ETB', amount: 2900 },
      { type: 'USD', amount: 1750 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Daniel Martinez',
    email: 'daniel.martinez@example.com',
    phoneNumber: '+251904567890',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1990-07-11',
    nid: 'NID4702581369',
    kebeleId: 'KEB014',
    avatar: `https://picsum.photos/200?random=14`,
    deposit: [
      { type: 'ETB', amount: 4600 },
      { type: 'USD', amount: 2800 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Rachel Taylor',
    email: 'rachel.taylor@example.com',
    phoneNumber: '+251905678901',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1988-04-26',
    nid: 'NID5814703692',
    kebeleId: 'KEB015',
    avatar: `https://picsum.photos/200?random=15`,
    deposit: [
      { type: 'ETB', amount: 3300 },
      { type: 'USD', amount: 2000 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Andrew White',
    email: 'andrew.white@example.com',
    phoneNumber: '+251906789012',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1993-01-09',
    nid: 'NID6925814703',
    kebeleId: 'KEB016',
    avatar: `https://picsum.photos/200?random=16`,
    deposit: [
      { type: 'ETB', amount: 3900 },
      { type: 'USD', amount: 2400 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Stephanie Lewis',
    email: 'stephanie.lewis@example.com',
    phoneNumber: '+251907890123',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1991-11-14',
    nid: 'NID7036925814',
    kebeleId: 'KEB017',
    avatar: `https://picsum.photos/200?random=17`,
    deposit: [
      { type: 'ETB', amount: 2600 },
      { type: 'USD', amount: 1550 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Kevin Clark',
    email: 'kevin.clark@example.com',
    phoneNumber: '+251908901234',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1987-05-07',
    nid: 'NID8147036925',
    kebeleId: 'KEB018',
    avatar: `https://picsum.photos/200?random=18`,
    deposit: [
      { type: 'ETB', amount: 4100 },
      { type: 'USD', amount: 2700 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Nicole Walker',
    email: 'nicole.walker@example.com',
    phoneNumber: '+251909012345',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1994-08-20',
    nid: 'NID9258147036',
    kebeleId: 'KEB019',
    avatar: `https://picsum.photos/200?random=19`,
    deposit: [
      { type: 'ETB', amount: 3400 },
      { type: 'USD', amount: 2050 },
    ],
  },
  {
    id: uuid.v4() as string,
    name: 'Brandon Hall',
    email: 'brandon.hall@example.com',
    phoneNumber: '+251910123456',
    accountNumber: generateAccountNumber(),
    dateOfBirth: '1989-03-13',
    nid: 'NID0369258147',
    kebeleId: 'KEB020',
    avatar: `https://picsum.photos/200?random=20`,
    deposit: [
      { type: 'ETB', amount: 4300 },
      { type: 'USD', amount: 2900 },
    ],
  },
]

export const initialTransfers: Transfer[] = [
  {
    userId: initialUsers[0].id,
    date: dayjs(new Date())
      .subtract(Math.floor(Math.random() * 30), 'day')
      .toISOString(),
    amount: 250.0,
    currencyType: 'USD',
    type: 'sent',
    transactionId: generateTransactionId(),
    user: initialUsers.find((u) => u.id === initialUsers[0].id)!,
  },
  {
    userId: initialUsers[1].id,
    date: dayjs()
      .subtract(Math.floor(Math.random() * 30), 'day')
      .toISOString(),
    amount: 1200.0,
    currencyType: 'USD',
    type: 'sent',
    transactionId: generateTransactionId(),
    user: initialUsers.find((u) => u.id === initialUsers[1].id)!,
  },
  // {
  //   userId: initialUsers[2].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 560.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[2].id)!,
  // },
  // {
  //   userId: initialUsers[3].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 320.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[3].id)!,
  // },
  // {
  //   userId: initialUsers[4].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 180.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[4].id)!,
  // },
  // {
  //   userId: initialUsers[5].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 450.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[5].id)!,
  // },
  // {
  //   userId: initialUsers[6].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 750.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[6].id)!,
  // },
  // {
  //   userId: initialUsers[7].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 890.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[7].id)!,
  // },
  // {
  //   userId: initialUsers[8].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 340.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[8].id)!,
  // },
  // {
  //   userId: initialUsers[9].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 620.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[9].id)!,
  // },
  // {
  //   userId: initialUsers[10].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 270.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[10].id)!,
  // },
  // {
  //   userId: initialUsers[11].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 1100.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[11].id)!,
  // },
  // {
  //   userId: initialUsers[12].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 430.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[12].id)!,
  // },
  // {
  //   userId: initialUsers[13].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 680.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[13].id)!,
  // },
  // {
  //   userId: initialUsers[14].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 520.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[14].id)!,
  // },
  // {
  //   userId: initialUsers[15].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 790.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[15].id)!,
  // },
  // {
  //   userId: initialUsers[16].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 210.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[16].id)!,
  // },
  // {
  //   userId: initialUsers[17].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 950.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[17].id)!,
  // },
  // {
  //   userId: initialUsers[18].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 380.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[18].id)!,
  // },
  // {
  //   userId: initialUsers[19].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 1350.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[19].id)!,
  // },
  // {
  //   userId: initialUsers[0].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 420.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[0].id)!,
  // },
  // {
  //   userId: initialUsers[1].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 680.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[1].id)!,
  // },
  // {
  //   userId: initialUsers[2].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 290.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[2].id)!,
  // },
  // {
  //   userId: initialUsers[3].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 1150.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[3].id)!,
  // },
  // {
  //   userId: initialUsers[4].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 530.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[4].id)!,
  // },
  // {
  //   userId: initialUsers[5].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 820.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[5].id)!,
  // },
  // {
  //   userId: initialUsers[6].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 360.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[6].id)!,
  // },
  // {
  //   userId: initialUsers[7].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 740.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[7].id)!,
  // },
  // {
  //   userId: initialUsers[8].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 190.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[8].id)!,
  // },
  // {
  //   userId: initialUsers[9].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 1280.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[9].id)!,
  // },
  // {
  //   userId: initialUsers[10].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 460.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[10].id)!,
  // },
  // {
  //   userId: initialUsers[11].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 590.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[11].id)!,
  // },
  // {
  //   userId: initialUsers[12].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 310.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[12].id)!,
  // },
  // {
  //   userId: initialUsers[13].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 870.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[13].id)!,
  // },
  // {
  //   userId: initialUsers[14].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 240.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[14].id)!,
  // },
  // {
  //   userId: initialUsers[15].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 1050.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[15].id)!,
  // },
  // {
  //   userId: initialUsers[16].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 480.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[16].id)!,
  // },
  // {
  //   userId: initialUsers[17].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 660.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[17].id)!,
  // },
  // {
  //   userId: initialUsers[18].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 330.0,
  //   currencyType: 'ETB',
  //   type: 'received',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[18].id)!,
  // },
  // {
  //   userId: initialUsers[19].id,
  //   date: dayjs()
  //     .subtract(Math.floor(Math.random() * 30), 'day')
  //     .toISOString(),
  //   amount: 920.0,
  //   currencyType: 'USD',
  //   type: 'sent',
  //   transactionId: generateTransactionId(),
  //   user: initialUsers.find((u) => u.id === initialUsers[19].id)!,
  // },
]
