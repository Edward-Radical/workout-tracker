const { parse } = require('csv-parse');

import * as fs from 'fs';
import * as path from 'path';
import Exercises from '../models/Exercises.model';
import { level } from 'winston';

console.log("Seeding Exercises");

const filePath = path.join(__dirname, '../data/exercisesList/megaGymDataset.csv');
const results: string[] = [];

fs.createReadStream(filePath)
    .pipe(parse({
            columns: true
        }
    ))
    .on('data', (data: any) => {
        // For each raw read from the CSV create a row in the DB
        const {Title, Desc, Type, BodyPart, Equipment, Level} = data;
        const exerciseData = {
            name: Title,
            description: Desc,
            type: Type,
            body_part: BodyPart,
            equipment: Equipment,
            level: Level
        };
        const exercise = Exercises.create(exerciseData);
    })
    .on('error', (err: Error) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(results);
        console.log('Imported');
    });
