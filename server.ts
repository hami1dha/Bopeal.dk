import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const DATA_FILE = path.resolve(process.cwd(), 'reviews-data.json');

app.use(express.json());

// Initial baseline reviews
const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Mette Sommer',
    city: 'København N',
    rating: 5,
    title: 'Fandt studiebolig efter kun 3 uger!',
    comment: 'Jeg var så træt af at betale 300-400 kr. på dyre portaler uden svar. Listen med kollegier og almene boligselskaber her på bopæl.dk sparede mig for tusindvis af kroner, og jeg fik tilbudt en studiebolig på Nørrebro.',
    date: '12. okt. 2026',
    createdAt: 1728720000000,
    verifiedBuyer: true,
    helpfulCount: 24,
    categoryTag: 'Studiebolig'
  },
  {
    id: 'rev-2',
    name: 'Christian Lind',
    city: 'Aarhus C',
    rating: 5,
    title: 'De 7 kr. er tjent ind 100 gange',
    comment: 'Direkte adgang til pensionskassernes egne ventelister var guld værd for min kæreste og mig. Ingen mellemmænd eller falske annoncer. Super god og transparent service.',
    date: '8. okt. 2026',
    createdAt: 1728374400000,
    verifiedBuyer: true,
    helpfulCount: 19,
    categoryTag: 'Pensionskasser'
  },
  {
    id: 'rev-3',
    name: 'Søren & Line',
    city: 'Odense',
    rating: 5,
    title: 'Genial lejeguide og lejekontrakt-tjek',
    comment: 'Guiden til depositum og indflytningssyn alene er det hele værd. Det gav os tryghed til at vide hvad udlejeren må og ikke må kræve. Kæmpe anbefaling herfra!',
    date: '4. okt. 2026',
    createdAt: 1728028800000,
    verifiedBuyer: true,
    helpfulCount: 15,
    categoryTag: 'Lejeguide'
  },
  {
    id: 'rev-4',
    name: 'Fatima Al-Mansoor',
    city: 'Aalborg',
    rating: 4,
    title: 'Rigtig god og overskuelig samling',
    comment: 'Super rart at have alle almene ventelister samlet ét sted uden at skulle google i dagevis. Nemt at opsige og koster næsten ingenting.',
    date: '28. sep. 2026',
    createdAt: 1727510400000,
    verifiedBuyer: true,
    helpfulCount: 11,
    categoryTag: 'Almene boliger'
  }
];

// Helper to load persistent reviews
function getReviews(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading reviews file:', err);
  }
  return INITIAL_REVIEWS;
}

// Helper to save reviews
function saveReviews(reviews: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving reviews file:', err);
  }
}

// Ensure file exists on start
if (!fs.existsSync(DATA_FILE)) {
  saveReviews(INITIAL_REVIEWS);
}

// API ENDPOINTS - Always shared and accessible to 100% of visitors
app.get('/api/reviews', (_req, res) => {
  const reviews = getReviews();
  res.json({ reviews });
});

app.post('/api/reviews', (req, res) => {
  const { name, city, rating, title, comment, categoryTag } = req.body;
  if (!name || !title || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const today = new Date();
  const formattedDate = `${today.getDate()}. ${['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'][today.getMonth()]} ${today.getFullYear()}`;

  const newReview = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    city: String(city || 'Danmark').trim(),
    rating: Math.max(1, Math.min(5, Number(rating) || 5)),
    title: String(title).trim(),
    comment: String(comment).trim(),
    date: formattedDate,
    createdAt: Date.now(),
    verifiedBuyer: true,
    helpfulCount: 0,
    categoryTag: categoryTag || 'Medlem'
  };

  const current = getReviews();
  const updated = [newReview, ...current];
  saveReviews(updated);

  res.status(201).json({ review: newReview, reviews: updated });
});

app.post('/api/reviews/:id/helpful', (req, res) => {
  const { id } = req.params;
  const current = getReviews();
  const found = current.find(r => r.id === id);
  if (found) {
    found.helpfulCount = (found.helpfulCount || 0) + 1;
    saveReviews(current);
    return res.json({ success: true, helpfulCount: found.helpfulCount });
  }
  res.status(404).json({ error: 'Review not found' });
});

// Mount Vite middleware in development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`bopæl.dk fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
