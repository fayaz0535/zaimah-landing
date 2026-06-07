# ZAIMAH TECHNOLOGIES — Landing Page

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Claude AI Chatbot  
Served at `zaimahtech.ae` · Port 3001 · Docker on Hetzner

---

## Local Development

```bash
cp .env.local.example .env.local
# add ANTHROPIC_API_KEY to .env.local

npm install
npm run dev        # http://localhost:3001
```

Set PORT in package.json dev script if needed, or add `PORT=3001` to `.env.local`.

---

## First-Time Server Deployment

```bash
ssh root@62.238.22.128

cd /home
git clone https://github.com/fayaz0535/zaimah-landing.git
cd zaimah-landing

nano .env.local
# paste:
# ANTHROPIC_API_KEY=sk-ant-...
# NEXT_PUBLIC_SITE_URL=https://zaimahtech.ae

docker build -t zaimah-landing .
docker run -d \
  --name zaimah-landing \
  --env-file .env.local \
  -p 3001:3001 \
  --restart unless-stopped \
  zaimah-landing
```

---

## Nginx Config (system nginx on server)

Create `/etc/nginx/sites-available/zaimahtech.ae`:

```nginx
# HTTP → HTTPS redirect
server {
    listen 80;
    server_name zaimahtech.ae www.zaimahtech.ae;
    return 301 https://$host$request_uri;
}

# HTTPS
server {
    listen 443 ssl;
    server_name zaimahtech.ae www.zaimahtech.ae;

    ssl_certificate     /etc/letsencrypt/live/zaimahtech.ae/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zaimahtech.ae/privkey.pem;

    location / {
        proxy_pass         http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload:

```bash
ln -s /etc/nginx/sites-available/zaimahtech.ae /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

SSL cert (first time only):

```bash
certbot --nginx -d zaimahtech.ae -d www.zaimahtech.ae
```

---

## Redeploy (run on server after every git push)

```bash
cd /home/zaimah-landing && \
  git pull origin main && \
  docker stop zaimah-landing && \
  docker rm zaimah-landing && \
  docker build -t zaimah-landing . && \
  docker run -d \
    --name zaimah-landing \
    --env-file .env.local \
    -p 3001:3001 \
    --restart unless-stopped \
    zaimah-landing
```

---

## Useful Commands

```bash
docker ps                        # check running containers
docker logs zaimah-landing -f    # live logs
docker exec -it zaimah-landing sh  # shell into container
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # SEO metadata + JSON-LD + ThemeProvider
│   ├── page.tsx            # Main page assembling all sections
│   └── api/
│       ├── contact/route.ts  # Contact form POST
│       └── chat/route.ts     # Claude AI chatbot POST
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav, gradient underline, mobile drawer
│   │   └── Footer.tsx      # 3-col footer
│   ├── sections/
│   │   ├── Hero.tsx        # Full-viewport hero with NodeNetwork canvas
│   │   ├── Services.tsx    # 6-card service grid
│   │   ├── Products.tsx    # funnl + Sprint X cards
│   │   ├── About.tsx       # Copy + animated stat cards
│   │   ├── Testimonials.tsx # 3 client quotes
│   │   └── Contact.tsx     # Contact form with toast
│   └── ui/
│       ├── ChatWidget.tsx    # Fixed AI chatbot bubble
│       ├── AnimatedCounter.tsx # Count-up animation
│       ├── NodeNetwork.tsx  # Canvas node-network (right 58% only)
│       └── ThemeProvider.tsx # class-based dark/light mode context
└── lib/
    └── constants.ts        # Nav links, services, testimonials, stats
```

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Framework  | Next.js 16 App Router, standalone output |
| Language   | TypeScript strict                       |
| Styling    | Tailwind CSS v4 + CSS custom properties |
| Animations | Framer Motion                           |
| Icons      | Lucide React                            |
| Font       | Space Grotesk (Google Fonts)            |
| AI Chatbot | Anthropic Claude (claude-sonnet-4-20250514) |
| Port       | 3001                                    |
