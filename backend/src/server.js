import express from 'express'; import cors from 'cors';
import { createDatabase } from './repositories/Database.js';
import { ProblemRepository } from './repositories/ProblemRepository.js';
import { AttemptRepository } from './repositories/AttemptRepository.js';
import { RuleBasedEvaluator } from './evaluation/RuleBasedEvaluator.js';
import { EvaluationEngine } from './evaluation/EvaluationEngine.js';
import { apiRouter } from './routes/api.js';

const seedProblems = [
 {id:'parking-lot',title:'Parking Lot',difficulty:'Easy',description:'Design a parking lot that supports multiple vehicle types, parking spots, tickets, and fee calculation.',requirements:['Support car, bike, and truck vehicles.','Support different parking spot types.','Generate a ticket when a vehicle enters.','Calculate parking fees when a vehicle exits.','Keep pricing replaceable without rewriting ParkingLot.']},
 {id:'vending-machine',title:'Vending Machine',difficulty:'Medium',description:'Design a vending machine that accepts money, selects products, dispenses items, and returns change.',requirements:['Support multiple products and quantities.','Accept and validate money.','Allow product selection.','Dispense a product only when payment is sufficient.','Return change and handle out-of-stock products.']},
 {id:'elevator',title:'Elevator System',difficulty:'Medium',description:'Design an elevator system with multiple elevators, floor requests, movement, and request assignment.',requirements:['Support multiple elevators.','Accept internal and external floor requests.','Assign requests to suitable elevators.','Model elevator state and direction.','Keep request assignment policy replaceable.']}
];
const db=createDatabase(); const problems=new ProblemRepository(db); problems.seed(seedProblems); const attempts=new AttemptRepository(db); const engine=new EvaluationEngine({evaluators:[new RuleBasedEvaluator()]});
const app=express(); app.use(cors()); app.use(express.json({limit:'1mb'})); app.get('/api/health',(_req,res)=>res.json({ok:true})); app.use('/api',apiRouter({problems,attempts,engine}));
const port=process.env.PORT || 4000; app.listen(port,()=>console.log(`LLD Coach API running on http://localhost:${port}`));
export { app, db };
