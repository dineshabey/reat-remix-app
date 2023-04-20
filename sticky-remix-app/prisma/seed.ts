import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getSticky().map((sticky) => {
      return db.sticky.create({ data: sticky });
    })
  );
}

seed();

function getSticky() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      note: "Need to setup remix app",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
        note: "Need to create prisma DB",
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
        note: "SqlLite",
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
        note: "MongoDB",
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
        note: "Hippos",
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
        note: "Dinner",
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
        note: "Elevator",
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ];
}
