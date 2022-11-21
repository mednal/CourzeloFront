import { User } from "./user";

export interface Comment {
    id: number;
    user: User;
    commentaire: string;
}