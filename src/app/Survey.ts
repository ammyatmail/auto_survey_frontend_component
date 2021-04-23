import { CarInfo } from "./CarInfo";

export class Survey {
    constructor(
        public age: number,
        public gender: string,
        public license: string,
        public firstcar: string,
        public drivetrain: string,
        public fuel: string,
        public carscount: number,
        public carmake: string,
        public carmodel: string,
        public cars: CarInfo[]
    ) { }
}