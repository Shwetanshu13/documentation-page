import Link from "next/link";

export const metadata = {
    title: "Creating APK for React Native Expo | My Documentation",
    description: "Step-by-step guide to build APK files using Expo Managed Workflow and EAS Build",
};

export default function ExpoApkPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            {/* Header */}
            <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link
                        href="/"
                        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="doc-container">
                <h1 className="doc-title">🚀 Creating APK for React Native Expo Application</h1>

                <p className="doc-text">
                    This guide walks you through the correct process of generating an APK for your React Native Expo application
                    using the Expo Managed Workflow and EAS Build.
                </p>

                <div className="doc-divider"></div>

                {/* PART A */}
                <div className="part-header">📋 PART A — Prepare Your Project</div>

                {/* Step 1 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 1️⃣ Decide the Workflow</h2>
                    <p className="doc-text">We lock this first — choosing the right workflow is crucial.</p>

                    <p className="doc-text font-semibold">We are going with:</p>
                    <ul className="doc-list">
                        <li><span className="doc-check">✅</span> Expo Managed Workflow</li>
                        <li><span className="doc-cross">❌</span> No manual Android folder</li>
                        <li><span className="doc-cross">❌</span> No custom Gradle / Kotlin hacks</li>
                    </ul>

                    <div className="info-box">
                        <p className="text-blue-800 dark:text-blue-200 font-medium">
                            💡 This is the least error-prone path for APK generation.
                        </p>
                    </div>
                </section>

                {/* Step 2 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 2️⃣ Use Expo&apos;s Compatibility Resolver (NOT npm)</h2>
                    <p className="doc-text">This is where most people break their builds.</p>

                    <div className="critical-box">
                        <p className="text-red-800 dark:text-red-200 font-bold mb-2">🔴 Rule (non-negotiable)</p>
                        <p className="text-red-700 dark:text-red-300">
                            Every native dependency must be installed via <code className="code-inline">expo install</code>
                        </p>
                        <p className="text-red-700 dark:text-red-300 mt-2">
                            Native deps = anything that touches Android/iOS.
                        </p>
                    </div>

                    <p className="doc-text">Run this first (diagnostics):</p>
                    <pre className="code-block">npx expo doctor</pre>

                    <div className="warning-box">
                        <p className="text-amber-800 dark:text-amber-200">
                            ⚠️ If it reports mismatches — do not ignore them.
                        </p>
                    </div>
                </section>

                {/* Step 3 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 3️⃣ Reinstall Core Native Libraries Correctly</h2>
                    <p className="doc-text">Run these even if they are already installed:</p>

                    <pre className="code-block">{`npx expo install react-native-screens
npx expo install react-native-safe-area-context
npx expo install react-native-gesture-handler`}</pre>

                    <p className="doc-text font-semibold">Why this matters:</p>
                    <ul className="doc-list">
                        <li>Expo SDK 54 → RN 0.81</li>
                        <li>These libs must match internal RN APIs</li>
                        <li><code className="code-inline">npm install</code> often installs incompatible versions</li>
                    </ul>
                </section>

                {/* Step 4 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 4️⃣ Update All Expo Packages Safely</h2>
                    <p className="doc-text">Use Expo&apos;s upgrade tool — not npm update.</p>

                    <pre className="code-block">npx expo upgrade</pre>

                    <p className="doc-text font-semibold">When prompted:</p>
                    <ul className="doc-list">
                        <li><span className="doc-check">✅</span> Accept recommended versions</li>
                        <li><span className="doc-cross">❌</span> Do not force latest</li>
                    </ul>

                    <p className="doc-text">This aligns:</p>
                    <ul className="doc-list">
                        <li>Expo SDK</li>
                        <li>React Native</li>
                        <li>Expo modules</li>
                        <li>Metro config</li>
                    </ul>
                </section>

                {/* Step 5 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 5️⃣ Lock New Architecture OFF (important)</h2>
                    <p className="doc-text">In <code className="code-inline">app.json</code> or <code className="code-inline">app.config.js</code>:</p>

                    <pre className="code-block">{`{
  "expo": {
    "android": {
      "newArchEnabled": false
    }
  }
}`}</pre>

                    <div className="warning-box">
                        <p className="text-amber-800 dark:text-amber-200 font-semibold mb-2">⚠️ Why:</p>
                        <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 space-y-1">
                            <li>New Architecture + APK + SDK 54 is still fragile</li>
                            <li>You gain nothing for most apps</li>
                            <li>You lose hours debugging native errors</li>
                        </ul>
                    </div>
                </section>

                {/* Step 6 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 6️⃣ Clean EVERYTHING (critical)</h2>

                    <div className="critical-box">
                        <p className="text-red-800 dark:text-red-200 font-bold">🔴 This step is critical for a clean build!</p>
                    </div>

                    <p className="doc-text">From project root:</p>
                    <pre className="code-block">{`rm -rf node_modules
rm -rf .expo
rm package-lock.json
npm install`}</pre>

                    <p className="doc-text">Then:</p>
                    <pre className="code-block">npx expo prebuild --clean</pre>

                    <p className="doc-text">Even in managed workflow, this ensures:</p>
                    <ul className="doc-list">
                        <li>Correct native versions are selected</li>
                        <li>No stale configs leak into EAS</li>
                    </ul>
                </section>

                <div className="doc-divider"></div>

                {/* PART B */}
                <div className="part-header">🏗️ PART B — Create the APK (correct way)</div>

                <p className="doc-text">Now your project is stable. Let&apos;s build.</p>

                {/* Step 7 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 7️⃣ Install & Configure EAS (once)</h2>

                    <pre className="code-block">{`npm install -g eas-cli
eas login`}</pre>

                    <p className="doc-text">Inside your project:</p>
                    <pre className="code-block">eas build:configure</pre>

                    <div className="info-box">
                        <p className="text-blue-800 dark:text-blue-200">
                            💡 This creates <code className="code-inline">eas.json</code>.
                        </p>
                    </div>
                </section>

                {/* Step 8 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 8️⃣ Configure APK Output (important)</h2>
                    <p className="doc-text">Open <code className="code-inline">eas.json</code> and ensure this exists:</p>

                    <pre className="code-block">{`{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}`}</pre>

                    <div className="warning-box">
                        <p className="text-amber-800 dark:text-amber-200 font-semibold mb-2">⚠️ Why:</p>
                        <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 space-y-1">
                            <li>Default Android build = AAB</li>
                            <li>You explicitly want an APK</li>
                        </ul>
                    </div>
                </section>

                {/* Step 9 */}
                <section className="doc-section">
                    <h2 className="doc-step">Step 9️⃣ Start the APK Build</h2>

                    <pre className="code-block">eas build -p android --profile preview</pre>

                    <div className="info-box">
                        <p className="text-blue-800 dark:text-blue-200 font-semibold mb-2">💡 What happens:</p>
                        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
                            <li>Expo runs <code className="code-inline">expo prebuild</code> on server</li>
                            <li>Android project is generated cleanly</li>
                            <li>APK is built using Expo&apos;s known-good toolchain</li>
                            <li>You get a download link</li>
                        </ul>
                    </div>
                </section>

                <div className="doc-divider"></div>

                {/* Summary */}
                <section className="doc-section">
                    <h2 className="doc-step">✅ Summary</h2>
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
                        <p className="text-green-800 dark:text-green-200 font-semibold mb-4">Quick Reference Commands:</p>
                        <pre className="code-block">{`# Diagnostics
npx expo doctor

# Install native deps correctly
npx expo install react-native-screens
npx expo install react-native-safe-area-context
npx expo install react-native-gesture-handler

# Upgrade Expo
npx expo upgrade

# Clean everything
rm -rf node_modules .expo package-lock.json
npm install
npx expo prebuild --clean

# Build APK
eas build -p android --profile preview`}</pre>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-12">
                <div className="max-w-4xl mx-auto px-6 py-6 text-center text-zinc-500 dark:text-zinc-500 text-sm">
                    Personal Documentation Hub
                </div>
            </footer>
        </div>
    );
}
