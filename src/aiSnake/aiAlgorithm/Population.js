// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object
import { mapRange } from "../utils";
import DNA from './DNA';

const { floor, min, random } = Math;

class Population {
    constructor(populationGoal, mutationRate, populationLength) {
        this.population = []; // Array to hold the current population
        this.matingPool = []; // ArrayList which we will use for our "mating pool"
        this.generations = 0; // Number of generations
        this.finished = false; // Are we finished evolving?
        this.populationGoal = populationGoal; // populationGoal = phrase - the phrase we are looking for
        this.mutationRate = mutationRate; // Mutation rate
        this.perfectScore = 1;
        
        this.best = "";
        this.bestFitness = 0;
        this.beginningTime = new Date().getTime();
        this.endTime = new Date().getTime(); //
        // first generate - currently generate random dna for each member of the population
        for (let i = 0; i < populationLength; i++) {
            this.population[i] = new DNA(this.populationGoal.length);
        }
        this.calcPopulationFitness();
    }
    
    /* Fields:
    population - array that holds current population
    matingPool - array of suitable mates - strong men and pretty women / smart men and women
     */
    
    calcPopulationFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(this.populationGoal);
        }
    }
    
    // Generate a mating pool
    naturalSelection() {
        // Clear the ArrayList // because we need new parents - better then the one from before
        this.matingPool = [];
        
        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
            if ( this.population[i].fitness > maxFitness ) {
                maxFitness = this.population[i].fitness;
            }
        }
        
        // Based on fitness, each member will get added to the mating pool a certain number of times
        // a higher fitness = more entries to mating pool = more likely to be picked as a parent
        // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
        for (let i = 0; i < this.population.length; i++) {
            const fitness = mapRange(this.population[i].fitness, 0, maxFitness, 0, 1);
            const numOfItemsInMatingPool = floor(fitness * 100); // comment from original: // Arbitrary multiplier, we can also use monte carlo method TODO: check what is monte carlo method
            for (let j = 0; j < numOfItemsInMatingPool; j++) {
                this.matingPool.push(this.population[i]);
            };
            if(!this.matingPool.length) this.matingPool.push(this.population[0]);
        }
    };
    
    // Create a new generation
    generate() {
        for (let i = 0; i < this.population.length; i++) {
            // original code comment: // Refill the population with children from the mating pool
            // a and b are the number of parents, can be more then 2! all we do is mix them by some algorithm
            const a = floor(random() * this.matingPool.length);
            const b = floor(random() * this.matingPool.length);
            const partnerA = this.matingPool[a];
            const partnerB = this.matingPool[b];
            const child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    }
    
    getBest() {
        return this.best;
    }
    getBestFitness() {
        return this.bestFitness;
    }
    getMutationRate() {
        return this.mutationRate;
    }
    
    // Compute the current "most fit" member of the population
    evaluate() {
        let worldRecord = 0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > worldRecord) {
                index = i;
                worldRecord = this.population[i].fitness;
            }
        }
        
        this.best = this.population[index].getPhrase();
        this.bestFitness = this.population[index].fitness;
        if (worldRecord === this.perfectScore) {
            this.finished = true;
        }
    }
    
    isFinished() {
        this.endTime = new Date().getTime();
        return this.finished;
    }
    
    getBeginningTime() {
        return this.beginningTime
    }
    getEndTime() {
        return this.endTime
    }
    getTimeScore() {
        return this.endTime - this.beginningTime;
    }
    
    
    
    getGenerations() {
        return this.generations;
    }
    
    // Compute average fitness for the population
    getAverageFitness() {
        let total = 0;
        for (let i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }
        return total / (this.population.length);
    }
    
    allPhrasesArray() {
        return this.population.map(dna => dna.getPhrase());
    }
    
    allPhrases() {
        let everything = "";
        let displayLimit = min(this.population.length, 50);
        for (let i = 0; i < displayLimit; i++) {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }
}

export default Population;
