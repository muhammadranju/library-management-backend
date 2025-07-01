import { Model, Types } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  image: string;
  updatedAt: Date;
}

export interface IBorrow {
  book: Types.ObjectId; // or IBook if populated
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBorrowUpdate extends Model<IBorrow> {
  updateAvailability(id: string): void;
}
