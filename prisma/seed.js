import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter })

const userId = "b4eb2ea6-ada5-4a2c-bb11-ee8d7b942f12";

const movies = [
    {
        title: "Bad Boys",
        director: "Michael Bay",
        overview: "Two hip detectives protect a witness to a murder while investigating a case of stolen heroin from the evidence room of their precinct.",
        releaseYear: 1995,
        genres: ["Action", "Comedy", "Crime"],
        runtime: 119,
        posterUrl: "https://www.imdb.com/title/tt0112442/mediaviewer/rm851454720/",
        createdBy: userId
    },
    {
        title: "The Rock",
        director: "Michael Bay",
        overview: "A mild-mannered chemist and an ex-con jailbreaker must lead a counter-strike against a rogue group of military men who have taken over Alcatraz.",
        releaseYear: 1996,
        genres: ["Action", "Adventure", "Thriller"],
        runtime: 136,
        posterUrl: "https://www.imdb.com/title/tt0117500/mediaviewer/rm2777683456/",
        createdBy: userId
    },
    {
        title: "Armageddon",
        director: "Michael Bay",
        overview: "After discovering that an asteroid the size of Texas is going to impact Earth, NASA recruits a misfit team of deep-core drillers to save the planet.",
        releaseYear: 1998,
        genres: ["Action", "Adventure", "Sci-Fi"],
        runtime: 151,
        posterUrl: "https://www.imdb.com/title/tt0120591/mediaviewer/rm847843072/",
        createdBy: userId
    },
    {
        title: "Pearl Harbor",
        director: "Michael Bay",
        overview: "A tale of war and romance mixed in with history, following two lifelong friends and a beautiful nurse during the infamous 1941 attack.",
        releaseYear: 2001,
        genres: ["Action", "Drama", "History", "Romance"],
        runtime: 183,
        posterUrl: "https://www.imdb.com/title/tt0213149/mediaviewer/rm2150209536/",
        createdBy: userId
    },
    {
        title: "Transformers",
        director: "Michael Bay",
        overview: "An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.",
        releaseYear: 2007,
        genres: ["Action", "Sci-Fi", "Adventure"],
        runtime: 144,
        posterUrl: "https://www.imdb.com/title/tt0418279/mediaviewer/rm1758532608/",
        createdBy: userId
    },
    {
        title: "6 Underground",
        director: "Michael Bay",
        overview: "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.",
        releaseYear: 2019,
        genres: ["Action", "Thriller"],
        runtime: 128,
        posterUrl: "https://www.imdb.com/title/tt8106534/mediaviewer/rm818777089/",
        createdBy: userId
    },
];

const main = async () => {
    console.log("Seeding movies...");

    for (const movie of movies) {
        // 1Check if the movie already exists in the database based on the title
        const existingMovie = await prisma.movie.findFirst({
            where: { title: movie.title },
        });

        // If the movie doesn't exist, create it. Otherwise, skip to the next one.
        if (!existingMovie) {
            await prisma.movie.create({
                data: movie,
            });
            console.log(`Created movie: ${movie.title}`);
        } else {
            console.log(`Skipped movie (already exists): ${movie.title}`);
        }
    }

    console.log("Seeding completed.");
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });