# My Blog — Personal Website with Google AdSense

A modern, responsive personal blog built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Features Google AdSense integration for monetization.

## Features

- **4 Blog Categories**: Reviews, Geopolitics, Finance & Investing, Coding
- **Markdown Editor**: Admin panel with live preview — write in markdown, publish as beautiful blog posts
- **Google AdSense Ready**: Strategic ad placements throughout the site
- **Supabase Backend**: Free PostgreSQL database for storing posts
- **Responsive Design**: Mobile-first, looks great on all devices
- **SEO Optimized**: Meta tags, Open Graph, semantic HTML, fast loading
- **Dark Mode**: Automatic dark mode based on system preferences
- **Sample Data**: Works out of the box with sample posts (no Supabase needed to preview)

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | React framework with SSR/SSG |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Supabase | Database & backend |
| react-markdown | Markdown rendering |
| Lucide Icons | UI icons |
| date-fns | Date formatting |

## Getting Started

### Prerequisites

- Node.js 20+ (recommended) or 18+
- npm

### 1. Install Dependencies

```bash
cd my-blog
npm install
```

### 2. Run Locally (with sample data)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site works immediately with sample blog posts.

### 3. Connect Supabase (optional, for creating real posts)

1. Create a free project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Fill in your Supabase URL and anon key (found in Settings > API)
4. Create the `posts` table in Supabase SQL Editor:

```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('reviews', 'geopolitics', 'finance', 'coding')),
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Published posts are viewable by everyone"
ON posts FOR SELECT
USING (published = true);

-- Allow all operations for authenticated users (admin)
-- For a personal blog, you can also use a service role key
CREATE POLICY "Allow all operations for admin"
ON posts FOR ALL
USING (true)
WITH CHECK (true);

-- Create an index for faster queries
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published);
```

5. Restart the dev server

### 4. Connect Google AdSense

1. Sign up at [Google AdSense](https://adsense.google.com)
2. Add your publisher ID to `.env.local`:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```
3. Create ad units in AdSense dashboard and add slot IDs as needed
4. Ad placeholders will be replaced with real ads once configured

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect the repo to [Netlify](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Vercel

1. Push to GitHub
2. Import at [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy (zero config needed)

## Project Structure

```
my-blog/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout (navbar, footer, AdSense)
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog listing + [slug] pages
│   │   ├── reviews/            # Reviews category
│   │   ├── geopolitics/        # Geopolitics category
│   │   ├── finance/            # Finance category
│   │   ├── coding/             # Coding category
│   │   └── admin/              # Admin dashboard + markdown editor
│   ├── components/             # Reusable React components
│   │   ├── Navbar.tsx          # Responsive navigation
│   │   ├── Footer.tsx          # Site footer
│   │   ├── BlogCard.tsx        # Blog post card
│   │   ├── AdBanner.tsx        # Google AdSense component
│   │   ├── Hero.tsx            # Home page hero section
│   │   ├── MarkdownRenderer.tsx # Markdown → HTML
│   │   └── CategoryPage.tsx    # Shared category layout
│   └── lib/                    # Utilities & data layer
│       ├── types.ts            # TypeScript types
│       ├── supabase.ts         # Supabase client
│       ├── posts.ts            # Data fetching (Supabase or sample data)
│       └── sampleData.ts       # Sample blog posts for local dev
├── .env.local.example          # Environment variables template
├── next.config.ts              # Next.js configuration
├── package.json
└── README.md
```

## Customization

- **Change the site name**: Search for "Abhinav" and replace with your name
- **Update social links**: Edit `Footer.tsx` and `about/page.tsx`
- **Add new categories**: Update `CATEGORIES` array in `src/lib/types.ts`
- **Change colors**: Modify gradient and color values in `types.ts` and `globals.css`
- **Add more ad placements**: Use the `<AdBanner />` component anywhere

## License

MIT — use it however you want.
