import { randomLetterGen } from "../utils";

const { floor, random } = Math;
//code is based on course Genetic Algorithm, Evolving Shakespeare:
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

// Constructor - make a random DNA
class DNA {
    genes; // TODO : is that required? WebStorm linter asked for it
    constructor(numOfGenes) {
        // The genetic sequence
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < numOfGenes; i++) {
            this.genes[i] = randomLetterGen(); // Pick from range of chars
        }
    }
    
    // Converts character array to a String
    getPhrase() {
        return this.genes.join("");
    }
    
    // Fitness function (returns floating point % of "correct" characters)
    calcFitness = (target) => {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            /*
            The fitness check:
            here we check if the letter is equal to the target letter in same place
             */
            if ( this.genes[i] === target.charAt(i) ) {
                score++;
            }
        }
        this.fitness = score / target.length;
    }
    
    // Crossover - sex!
    crossover(partner) {
        // A new child
        let child = new DNA(this.genes.length);
        //original sex code:
        // let midpoint = floor(random() * this.genes.length); // Pick a midpoint
        // Half from one, half from the other
        // for (let i = 0; i < this.genes.length; i++) {
        //     if (i > midpoint) child.genes[i] = this.genes[i];
        //     else child.genes[i] = partner.genes[i];
        // }
        // updated sex code:
        // randomized for each gen in dna which gen the child gets:
        for (let i = 0; i < this.genes.length; i++) {
            // TODO do wheel of fortune in which the stronger that has more options to survive then the weaker dna
            const randomTrueFalse = !!floor(random() * 2);
            if ( randomTrueFalse ) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }
    
    // Based on a mutation probability, picks a new random character
    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if ( random() < mutationRate ) {
                this.genes[i] = randomLetterGen();
            }
        }
    }
}

export default DNA;
