export default function Home() {
  const projects = [
    {
      name: "Lyrics Finder",
      link: "https://lyrics-wheat.vercel.app/",
      description: "Search and view lyrics instantly."
    },
    {
      name: "Token Getter",
      link: "https://getnew-xi.vercel.app/",
      description: "Safely extract your Facebook access token."
    },
    {
      name: "Profile Guard",
      link: "https://profile-guard.vercel.app/",
      description: "Enable Facebook profile picture guard easily."
    }
  ];

  return (
    <html lang="en">
      <head>
        <title>My Projects Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold text-center mb-4">My Web Projects</h1>
            <p className="text-center text-lg text-gray-600 mb-10">
              Built with ❤️ using Next.js and deployed on Vercel
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((proj, index) => (
                <a
                  key={index}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                >
                  <h2 className="text-2xl font-semibold mb-2">{proj.name}</h2>
                  <p className="text-gray-600">{proj.description}</p>
                  <span className="text-blue-600 text-sm mt-2 inline-block">Visit →</span>
                </a>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
    }

