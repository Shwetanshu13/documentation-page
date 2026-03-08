import Link from "next/link";

const documentations = [
  {
    title: "Creating APK for React Native Expo",
    description: "Step-by-step guide to build APK files using Expo Managed Workflow and EAS Build",
    href: "/docs/expo-apk",
    category: "Mobile Development",
  },
  {
    title: "C++ STL & DSA Cheatsheet",
    description:
      "Most-used C++ STL syntax + DSU, Fenwick, Segment Tree, PBDS for CP/LeetCode",
    href: "/docs/cpp",
    category: "C++ / Competitive Programming",
  },
  {
    title: "Express Backend Template",
    description:
      "Clean Express structure: routes/controllers/services/repos + Drizzle & Mongoose + JWT/session auth",
    href: "/docs/express-backend",
    category: "Backend / Express",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            📚 My Documentation
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Quick access documentation for frequently used topics
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-8">
          Available Documentation
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documentations.map((doc, index) => (
            <Link
              key={index}
              href={doc.href}
              className="block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg transition-all duration-200"
            >
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {doc.category}
              </span>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-2 mb-3">
                {doc.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {doc.description}
              </p>
              <span className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-zinc-500 dark:text-zinc-500 text-sm">
          Personal Documentation Hub
        </div>
      </footer>
    </div>
  );
}
