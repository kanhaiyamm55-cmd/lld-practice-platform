import { Router } from 'express';
export function apiRouter({ problems, attempts, engine }) {
  const router = Router();
  router.get('/problems', (_req,res) => res.json(problems.all()));
  router.get('/problems/:id', (req,res) => { const p=problems.find(req.params.id); p ? res.json(p) : res.status(404).json({error:'Problem not found'}); });
  router.post('/attempts', (req,res) => { const p=problems.find(req.body.problemId); if(!p) return res.status(404).json({error:'Problem not found'}); res.status(201).json(attempts.create(p.id, req.body.submission ?? {})); });
  router.put('/attempts/:id', (req,res) => { const a=attempts.find(req.params.id); if(!a) return res.status(404).json({error:'Attempt not found'}); res.json(attempts.updateSubmission(a.id, req.body.submission ?? {})); });
  router.post('/attempts/:id/submit', (req,res) => {
    const a=attempts.find(req.params.id); if(!a) return res.status(404).json({error:'Attempt not found'});
    const p=problems.find(a.problemId); if(!p) return res.status(404).json({error:'Problem not found'});
    try { const submission=req.body.submission ?? a.submission; attempts.updateSubmission(a.id, submission); const result=engine.evaluate(p, submission); return res.json(attempts.complete(a.id, result.score, result)); }
    catch(error) { return res.status(503).json(attempts.fail(a.id, 'Evaluation failed. Your submission was saved. Retry later.')); }
  });
  router.get('/attempts', (_req,res) => res.json(attempts.all()));
  router.get('/attempts/:id', (req,res) => { const a=attempts.find(req.params.id); a ? res.json(a) : res.status(404).json({error:'Attempt not found'}); });
  return router;
}
