import { BlogPost } from "./types";

const IMG = "https://nctriqpghhrulpjmqubq.supabase.co/storage/v1/object/public/blog-images/covers";

export const samplePosts: BlogPost[] = [
  // ── Reviews ──
  {
    id: "1",
    title: "iPhone 16 vs Google Pixel 9: The Definitive Verdict",
    slug: "iphone-16-vs-google-pixel-9",
    cover_image: `${IMG}/iphone-16-vs-google-pixel-9.jpg`,
    excerpt:
      "I have a Pixel. My wife has an iPhone. After months of living with both, only one of us is happy. Spoiler: it's not me.",
    category: "reviews",
    published: true,
    created_at: "2026-02-10T10:00:00Z",
    updated_at: "2026-02-10T10:00:00Z",
    content: `## The Only Smartphone Comparison That Matters

I own a Google Pixel 9. My wife owns an iPhone 16. We've been using them side by side for months. I've run benchmarks, compared cameras, tested battery life, analyzed the ecosystems, and after all that exhaustive research, I have reached one definitive conclusion:

**The iPhone wins, because my wife said so.**

> And if you're married, you already know — that's the only benchmark that matters.`,
  },

  // ── Geopolitics ──
  {
    id: "3",
    title: "The Shifting Power Dynamics in the Indo-Pacific",
    slug: "shifting-power-dynamics-indo-pacific",
    cover_image: `${IMG}/shifting-power-dynamics-indo-pacific.jpg`,
    excerpt:
      "How the Indo-Pacific region is becoming the center of global power — and why everyone should be paying attention.",
    category: "geopolitics",
    published: true,
    created_at: "2026-02-05T09:00:00Z",
    updated_at: "2026-02-05T09:00:00Z",
    content: `## The New Great Game

The Indo-Pacific isn't just a geographic region anymore — it's the chessboard where the future of global power is being decided.

### The Key Players

**The United States** is doubling down on its Indo-Pacific strategy, strengthening alliances with Japan, South Korea, Australia, and India through frameworks like QUAD and AUKUS.

**China** continues its assertive posture in the South China Sea while building economic leverage through the Belt and Road Initiative. The question isn't whether China is a superpower — it's what kind of superpower it wants to be.

**India** is playing a fascinating balancing act — maintaining strategic autonomy while deepening ties with both the West and Russia. The "multi-alignment" strategy is pragmatic but risky.

### The Semiconductor Factor

Taiwan sits at the heart of this power struggle, not just geographically but technologically. **TSMC produces over 60% of the world's advanced semiconductors.** Control over Taiwan isn't just about territory — it's about controlling the backbone of modern technology.

### What I Think

The Indo-Pacific will define the 21st century the way the Atlantic defined the 20th. Here's my take:

1. **Economic interdependence** makes full-scale conflict unlikely but doesn't prevent it
2. **Technology is the new oil** — whoever leads in AI, semiconductors, and quantum computing leads the world
3. **Middle powers matter more than ever** — countries like Indonesia, Vietnam, and the Philippines are no longer passive players
4. **Climate change is a threat multiplier** — rising sea levels will displace millions in this region

### The Bottom Line

We're witnessing a once-in-a-century power transition. It won't be smooth, but understanding these dynamics is crucial for anyone who wants to understand where the world is heading.`,
  },
  {
    id: "4",
    title: "Why Africa Is the Next Economic Frontier",
    slug: "africa-next-economic-frontier",
    cover_image: `${IMG}/africa-next-economic-frontier.jpg`,
    excerpt:
      "The continent most investors ignore is quietly building the foundation for explosive growth.",
    category: "geopolitics",
    published: true,
    created_at: "2026-01-15T11:00:00Z",
    updated_at: "2026-01-15T11:00:00Z",
    content: `## The Overlooked Continent

When people talk about emerging markets, they think China, India, Southeast Asia. Africa rarely makes the list. That's a mistake.

### The Numbers Don't Lie

- **1.4 billion people** — the youngest population on Earth (median age: 19)
- **8 of the 15 fastest-growing economies** in the world are in Africa
- **AfCFTA** (African Continental Free Trade Area) creates a single market of 1.3 billion people
- **$3.4 trillion combined GDP** — larger than India's a decade ago

### The Tech Revolution

Africa is leapfrogging traditional development paths:

- **M-Pesa** proved mobile money could work at scale before Apple Pay existed
- **Flutterwave and Paystack** are building pan-African payment infrastructure
- **Andela** is training world-class developers
- **Jumia** is building e-commerce infrastructure where none existed

### Challenges Are Real

Let's be honest about the hurdles:

1. **Infrastructure gaps** — power, roads, internet connectivity
2. **Political instability** in certain regions
3. **Brain drain** — talented people leaving for opportunities abroad
4. **Corruption** remains a systemic issue in some nations

### My Take

Africa in 2026 reminds me of Southeast Asia in 2010. The infrastructure is being built, the talent is there, and the market size is undeniable. Smart investors are already positioning themselves.

> The question isn't whether Africa will rise — it's which countries and sectors will lead the way.

Keep an eye on **Nigeria, Kenya, Rwanda, Ethiopia, and Ghana**. These are the ones to watch.`,
  },

  // ── Coding ──
  {
    id: "7",
    title: "Building a Full-Stack App with Next.js and Supabase",
    slug: "full-stack-nextjs-supabase",
    cover_image: `${IMG}/full-stack-nextjs-supabase.jpg`,
    excerpt:
      "A step-by-step guide to building a complete web app with Next.js, Supabase, and Tailwind CSS — all free.",
    category: "coding",
    published: true,
    created_at: "2026-02-08T12:00:00Z",
    updated_at: "2026-02-08T12:00:00Z",
    content: `## The Free Full-Stack Setup

You don't need to pay for servers, databases, or hosting to build a production-ready web app in 2026. Here's how.

### The Stack

- **Next.js** — React framework with SSR, routing, and API routes
- **Supabase** — PostgreSQL database + auth + storage (free tier is generous)
- **Tailwind CSS** — Utility-first styling
- **Vercel/Netlify** — Free hosting with auto-deploy

### Step 1: Project Setup

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm install @supabase/supabase-js
\`\`\`

### Step 2: Supabase Configuration

Create a \`.env.local\` file:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

Create the Supabase client:

\`\`\`typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
\`\`\`

### Step 3: Database Schema

In the Supabase dashboard, create your tables using the SQL editor:

\`\`\`sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
\`\`\`

### Step 4: Fetching Data

\`\`\`typescript
// In a Server Component
import { supabase } from '@/lib/supabase';

export default async function PostsPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      {posts?.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
\`\`\`

### Key Takeaways

1. **Supabase's free tier** gives you 500MB database, auth for 50K users, and 1GB storage
2. **Server Components** in Next.js mean you can query the database directly — no API routes needed
3. **Row Level Security** is crucial — always enable it
4. The whole stack is **free** until you have serious traffic

This is the stack I used to build this very blog. It's fast, free, and scales when you need it to.`,
  },
  {
    id: "8",
    title: "Why TypeScript Is Worth the Learning Curve",
    slug: "why-typescript-is-worth-it",
    cover_image: `${IMG}/why-typescript-is-worth-it.jpg`,
    excerpt:
      "Coming from JavaScript, TypeScript felt like overkill. After 2 years, I can not imagine going back.",
    category: "coding",
    published: true,
    created_at: "2026-01-10T16:00:00Z",
    updated_at: "2026-01-10T16:00:00Z",
    content: `## My Journey from JS to TS

I resisted TypeScript for a long time. "Why do I need types? JavaScript is fine!" — me, 2 years ago, before spending 3 hours debugging a \`undefined is not a function\` error.

### The Pain Points of JavaScript

\`\`\`javascript
// What could go wrong?
function processUser(user) {
  return user.name.toUpperCase();
}

// Everything. Everything could go wrong.
processUser(null);        // 💥 Cannot read properties of null
processUser({ naam: "test" }); // 💥 undefined is not a function
processUser(42);          // 💥 user.name is undefined
\`\`\`

### The TypeScript Version

\`\`\`typescript
interface User {
  name: string;
  email: string;
  age: number;
}

function processUser(user: User): string {
  return user.name.toUpperCase();
}

// All of these are caught at compile time ✅
processUser(null);              // ❌ Type error
processUser({ naam: "test" }); // ❌ Type error
processUser(42);                // ❌ Type error
\`\`\`

### What Changed My Mind

1. **IDE autocomplete**: TypeScript + VSCode gives you autocomplete that feels like a superpower. No more guessing API response shapes.

2. **Refactoring confidence**: Renaming a property? TypeScript shows you every file that needs updating. Instantly.

3. **Self-documenting code**: Types ARE documentation. A well-typed function tells you exactly what it expects and returns.

4. **Catch bugs before runtime**: About 40% of the bugs I used to find in testing are now caught by the compiler.

### Tips for Getting Started

- Start with \`strict: false\` in tsconfig and gradually enable strict checks
- Use \`any\` temporarily — but always come back to fix it
- Learn utility types: \`Partial<T>\`, \`Pick<T>\`, \`Omit<T>\` are game-changers
- Don't over-type — let TypeScript infer when it can

### The Verdict

TypeScript adds maybe 10% more code but prevents 40% of bugs and makes you 2x faster at navigating large codebases. The ROI is insane.

If you're still on the fence, just try it for one project. You won't go back.`,
  },
];
