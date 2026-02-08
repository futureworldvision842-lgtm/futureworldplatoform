import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding G.A.I.G.S. platform...");

  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.post.deleteMany();
  await prisma.societyMember.deleteMany();
  await prisma.society.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: "muhammadqureshi865@gmail.com" },
    update: { location: "Islamabad, Pakistan" },
    create: {
      name: "Muhammad Qureshi",
      email: "muhammadqureshi865@gmail.com",
      password: hashedPassword,
      bio: "Founder of G.A.I.G.S. Islamic Scholar, AI Enthusiast, Systems Architect from Islamabad, Pakistan.",
      phone: "+92 333 9214600",
      location: "Islamabad, Pakistan",
      skills: JSON.stringify(["AI & ML", "Blockchain", "Governance Systems", "Islamic Studies", "Community Building"]),
      role: "SUPER_ADMIN",
      verified: true,
      wallets: { create: { balance: 10000, currency: "USD", type: "PERSONAL" } },
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@gaigs.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@gaigs.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      verified: true,
      location: "Islamabad, Pakistan",
      wallets: { create: { balance: 5000, currency: "USD", type: "PERSONAL" } },
    },
  });

  const users = await Promise.all(
    [
      { name: "Ali Hassan", email: "ali@gaigs.com", role: "SOCIETY_ADMIN", location: "Islamabad, Pakistan" },
      { name: "Fatima Shah", email: "fatima@gaigs.com", role: "USER", location: "Lahore, Pakistan" },
      { name: "Dr. Ahmed Khan", email: "ahmed@gaigs.com", role: "CITY_ADMIN", location: "Islamabad, Pakistan" },
      { name: "Sara Ahmed", email: "sara@gaigs.com", role: "COUNTRY_ADMIN", location: "Karachi, Pakistan" },
      { name: "John Smith", email: "john@gaigs.com", role: "GLOBAL_ADMIN", location: "London, UK" },
      { name: "Amina Bibi", email: "amina@gaigs.com", role: "USER", location: "Lahore, Pakistan" },
      { name: "Usman Khan", email: "usman@gaigs.com", role: "USER", location: "Peshawar, Pakistan" },
      { name: "Ibrahim Ali", email: "ibrahim@gaigs.com", role: "USER", location: "Rawalpindi, Pakistan" },
    ].map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: { location: (u as any).location },
        create: {
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: u.role,
          verified: true,
          location: (u as any).location,
          wallets: { create: { balance: 1000, currency: "USD", type: "PERSONAL" } },
        },
      })
    )
  );

  const societyAdmins = await Promise.all(
    [
      { name: "Lahore Community Admin", email: "admin.lahore@gaigs.com", location: "Lahore, Pakistan" },
      { name: "Karachi Society Lead", email: "admin.karachi@gaigs.com", location: "Karachi, Pakistan" },
      { name: "Peshawar Council Head", email: "admin.peshawar@gaigs.com", location: "Peshawar, Pakistan" },
      { name: "Rawalpindi Community Admin", email: "admin.rawalpindi@gaigs.com", location: "Rawalpindi, Pakistan" },
    ].map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: "SOCIETY_ADMIN",
          verified: true,
          location: u.location,
          wallets: { create: { balance: 1000, currency: "USD", type: "PERSONAL" } },
        },
      })
    )
  );

  const societiesData = [
    {
      name: "Masjid Nabvi Community G-11/4",
      type: "MOSQUE",
      description: "Community center based on Masjid-e-Nabawi model. G-11/4, Islamabad.",
      address: "Block D-4, FGEHF Apartments, G-11/4, Islamabad",
      cityName: "Islamabad",
      countryName: "Pakistan",
      lat: 33.6844,
      lng: 73.0479,
      fundsBalance: 15430,
      adminId: superAdmin.id,
      memberUserIds: [superAdmin.id, users[0].id, users[1].id, users[2].id, users[5].id],
      posts: [
        { content: "G.A.I.G.S. platform is now live! Join us in building transparent governance for all humanity.", type: "ANNOUNCEMENT", likes: 234, authorIdx: 0 },
        { content: "Our society completed the solar panel project! Every member can verify the budget transparently.", type: "DISCUSSION", likes: 156, authorIdx: 1 },
        { content: "Monthly community meeting this Saturday 10 AM. Agenda: new proposals and fund allocation.", type: "EVENT", likes: 89, authorIdx: 0 },
      ],
      proposal: { title: "Community Solar Panel Installation", desc: "Install solar panels. Budget: $15,000.", yes: 145, no: 32, abstain: 8 },
    },
    {
      name: "Lahore Central Mosque Society",
      type: "MOSQUE",
      description: "Central mosque and community hub for Lahore. Transparent governance and welfare.",
      address: "Lahore Central, near Mall Road",
      cityName: "Lahore",
      countryName: "Pakistan",
      lat: 31.5204,
      lng: 74.3587,
      fundsBalance: 22500,
      adminId: societyAdmins[0].id,
      memberUserIds: [societyAdmins[0].id, users[1].id, users[5].id, users[3].id],
      posts: [
        { content: "Welcome to Lahore Central Society. All decisions and funds are transparent here.", type: "ANNOUNCEMENT", likes: 120, authorIdx: 0 },
        { content: "Discussion: Should we start a free tutoring program for local students? Share your views.", type: "DISCUSSION", likes: 67, authorIdx: 1 },
      ],
      proposal: { title: "Free Tutoring Program for Students", desc: "Weekly free classes. Budget: $5,000/year.", yes: 89, no: 12, abstain: 5 },
    },
    {
      name: "Karachi Coastal Community Center",
      type: "COMMUNITY",
      description: "Community center serving the coastal area. Focus on education and disaster preparedness.",
      address: "Clifton, Karachi",
      cityName: "Karachi",
      countryName: "Pakistan",
      lat: 24.8607,
      lng: 67.0011,
      fundsBalance: 31000,
      adminId: societyAdmins[1].id,
      memberUserIds: [societyAdmins[1].id, users[3].id, users[4].id],
      posts: [
        { content: "Coastal cleanup drive next week. All volunteers welcome. Refreshments from society fund (tracked).", type: "EVENT", likes: 200, authorIdx: 0 },
        { content: "Issue: Water supply disruption in Block B. We have raised it with city admin via platform.", type: "ISSUE", likes: 45, authorIdx: 1 },
      ],
      proposal: { title: "Coastal Cleanup & Recycling Initiative", desc: "Monthly cleanup and recycling. Budget: $8,000.", yes: 156, no: 22, abstain: 10 },
    },
    {
      name: "Peshawar Frontier Community",
      type: "COMMUNITY",
      description: "Unity hub for Peshawar. Education, health, and transparent decision-making.",
      address: "University Road, Peshawar",
      cityName: "Peshawar",
      countryName: "Pakistan",
      lat: 34.0151,
      lng: 71.5249,
      fundsBalance: 12800,
      adminId: societyAdmins[2].id,
      memberUserIds: [societyAdmins[2].id, users[6].id],
      posts: [
        { content: "New members: welcome! Check our dashboard for active proposals and transparent funds.", type: "ANNOUNCEMENT", likes: 78, authorIdx: 0 },
      ],
      proposal: { title: "Youth Sports Complex Renovation", desc: "Renovate local sports facility. Budget: $12,000.", yes: 98, no: 15, abstain: 7 },
    },
    {
      name: "Rawalpindi Twin City Society",
      type: "COMMUNITY",
      description: "Serving Rawalpindi and twin city area. Transparent governance and community welfare.",
      address: "Satellite Town, Rawalpindi",
      cityName: "Rawalpindi",
      countryName: "Pakistan",
      lat: 33.6055,
      lng: 73.0543,
      fundsBalance: 18700,
      adminId: societyAdmins[3].id,
      memberUserIds: [societyAdmins[3].id, users[7].id, users[0].id],
      posts: [
        { content: "Twin City Society is now on G.A.I.G.S. All funds and votes are blockchain-verified.", type: "ANNOUNCEMENT", likes: 95, authorIdx: 0 },
        { content: "Idea: Community garden on the empty plot near the mosque. Thoughts?", type: "IDEA", likes: 56, authorIdx: 1 },
      ],
      proposal: { title: "Community Garden Project", desc: "Create a community garden. Budget: $3,000.", yes: 72, no: 8, abstain: 3 },
    },
  ];

  for (const s of societiesData) {
    const authorIds = [s.adminId, ...s.memberUserIds.filter((id) => id !== s.adminId)];
    const society = await prisma.society.create({
      data: {
        name: s.name,
        type: s.type,
        description: s.description,
        address: s.address,
        cityName: s.cityName,
        countryName: s.countryName,
        latitude: s.lat,
        longitude: s.lng,
        fundsBalance: s.fundsBalance,
        adminId: s.adminId,
        members: {
          create: s.memberUserIds.map((uid) => ({ userId: uid, role: uid === s.adminId ? "ADMIN" : "MEMBER" })),
        },
        proposals: {
          create: {
            title: s.proposal.title,
            description: s.proposal.desc,
            level: "SOCIETY",
            status: "ACTIVE",
            yesVotes: s.proposal.yes,
            noVotes: s.proposal.no,
            abstainVotes: s.proposal.abstain,
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdById: s.adminId,
          },
        },
        posts: {
          create: s.posts.map((p) => ({
            content: p.content,
            type: p.type,
            likes: p.likes,
            authorId: authorIds[p.authorIdx] || s.adminId,
          })),
        },
      },
    });
    console.log("Created society:", society.name, society.cityName);
  }

  const firstSociety = await prisma.society.findFirst({ where: { cityName: "Islamabad" } });
  if (firstSociety && users[0]) {
    await prisma.team.create({
      data: {
        name: "Youth Volunteers",
        description: "Young members leading community events and cleanup drives.",
        createdById: users[0].id,
        societyId: firstSociety.id,
        members: {
          create: [
            { userId: users[0].id, role: "LEADER" },
            { userId: users[5].id, role: "MEMBER" },
          ],
        },
      },
    });
    await prisma.team.create({
      data: {
        name: "Education Committee",
        description: "Oversee tutoring and library programs.",
        createdById: superAdmin.id,
        societyId: firstSociety.id,
        members: {
          create: [
            { userId: superAdmin.id, role: "LEADER" },
            { userId: users[1].id, role: "MEMBER" },
          ],
        },
      },
    });
    console.log("Created teams for Islamabad society");
  }

  await prisma.donationCampaign.create({
    data: {
      title: "Global Earthquake Relief Fund",
      description: "Emergency aid fund for earthquake victims. All donations transparently tracked on blockchain.",
      targetAmount: 5000000,
      raisedAmount: 2500000,
      level: "GLOBAL",
      status: "ACTIVE",
    },
  });

  await prisma.notification.createMany({
    data: [
      { title: "Welcome to G.A.I.G.S.!", message: "Your governance journey begins now.", type: "SYSTEM", userId: superAdmin.id },
      { title: "New Proposal Available", message: "Solar Panel Installation proposal is open for voting.", type: "VOTE", userId: superAdmin.id },
    ],
  });

  console.log("Seeding completed successfully!");
  console.log("\nDemo credentials: admin@gaigs.com / password123");
  console.log("Societies by location: Islamabad, Lahore, Karachi, Peshawar, Rawalpindi");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
