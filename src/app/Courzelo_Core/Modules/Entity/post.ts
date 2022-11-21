import { User } from "./user";
import { Comment } from "./comment";

export class Post {
    idPost!: number;
    user!: User;
    publication!: string;
    typefile: any;
    comments!: Comment[];

    // constructor(id:number, publication: string, comments:Comment[]){
    //     this.id=id;
    //     this.publication = publication;
    //     this.comments = comments;
    // }
}