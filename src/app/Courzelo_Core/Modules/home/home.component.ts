import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { add } from 'date-fns';
import { FileUpload } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/file';

import { FileUploadService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/file-upload.service';
import Swal from 'sweetalert2';
import { CommentService } from '../../Shared/Service/comment.service';
import { PostService } from '../../Shared/Service/post.service';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';
import { Post } from '../Entity/post';
import { LikeServiceService } from '../../Shared/Service/like-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./aa.scss']
})

export class HomeComponent implements OnInit {
  
  constructor(private tokenService: TokenStorageService, private postService: PostService, private commentService: CommentService, private routerr: Router,
              private uploadService: FileUploadService,
              private storage: AngularFireStorage,
              private likeService: LikeServiceService,
              private activatedRoute: ActivatedRoute) { 
                this.responsiveOptions = [{
                  breakpoint: '1024px',
                  numVisible: 1,
                  numScroll: 3
              }];
              }

images: any[] = [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-nBySBYEj3cwvL-HF8qkWt9-DivInGqMWhixe0b0khGve3yl_EEcLszeCBo9sjnLw0Y&usqp=CAU',
                'https://pbs.twimg.com/profile_images/1235868806079057921/fTL08u_H_400x400.png',
                'https://dig.hum.uu.nl/wp-content/uploads/sites/412/2019/06/python-7be70baaac.png',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
                'https://play-lh.googleusercontent.com/uGqP7F-E_eaEwTb3hMz63MWf0YKRSK6n9INBwibBSOrGDg6B3sd-ACuqNrR312ohdQ',
                'https://cdn-icons-png.flaticon.com/512/732/732212.png',
              
                'https://play-lh.googleusercontent.com/uGqP7F-E_eaEwTb3hMz63MWf0YKRSK6n9INBwibBSOrGDg6B3sd-ACuqNrR312ohdQ',
                'https://cdn-icons-png.flaticon.com/512/732/732212.png',
              ];
              list = [];
              pageSize=5;
              tempList=[];
  currentuser: any;
  isSuccessful = false;
  form: any = {};
  posts: Post[] | any;
  comments: Comment[]| any;
  index: any;
  commentA = new Comment();
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  post= new Post();
  postByUser=false;
  userID: any;
  responsiveOptions;
  itemsPerSlide = 5;
 singleSlideOffset = true;
 noWrap = true;
 val: any;
 currentUser: any;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userID= params.get('id') || '';
    });
    this.currentUser = this.tokenService.getUser();
    this.getPosts();
    this.currentuser = this.tokenService.getUser();
    this.userID = this.currentuser.id;

    if(this.currentUser.id == this.userID){
      this.val = true;
    } else {
      this.val = false;
    }
  }
 

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      //this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage:any) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  public onAddPost(addForm: NgForm): void {
    
    
    this.postService.addPost(addForm.value, this.currentUser.id).subscribe(
      (response: Post | null) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your post was added',
          icon: 'success',
          confirmButtonText: 'Return'
        })
         console.log(this.currentUser.id);
        console.log(response!.user.id);
        
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Check your connection',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    );    
  }
  idPC: any;
  public getPosts(): void {
    this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
        console.log(this.posts);
        for(var p of this.posts){
          if(p.user.id == this.currentuser.id)
          {
            this.postByUser = true;
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  reloadPage(): void {
    this.routerr.navigate(["/home"]) ;
  }
  
  public getComments(idPost: number, i:number): void {
    this.index = i;
    this.commentService.getComments(idPost).subscribe(
      (response: Comment[]) => {
        this.posts[this.index].comments=response;
        //this.comments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } 
  
  public onAddComment(addComment: NgForm, idPost: any): void {
    this.currentuser = this.tokenService.getUser();
    // this.postService.getPostById(id).subscribe(
    //   (data) => {
    //     this.post = data;
    //     // this.post.publication = data.publication;
    //     // this.post.user = Object.values(data.user);
    //   }
    //   }
    // );
    this.commentService.addComment(addComment.value, this.currentuser.id, idPost).subscribe(
      (response: Comment | null) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your comment was added',
          icon: 'success',
          confirmButtonText: 'Return'
        })
         console.log(this.currentuser.id);

        this.reloadPage();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Check your connection',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    );    
  }
  // name ='publication';
  // commentaire = 'form';
  // @ViewChild('name2') inputName:any;
  // handleClear(){
  //   // this.name = '';
  //   // this.commentaire = '';
  //   this.inputName.nativeElement.value = ' ';
  // }

  typefile: File[]=[];
  urlPostImage: string[] = [];

  // onValueChangeCourseImage(file: File[]) {
  //   this.typefile = file;
  //   if (file) {
  //     this.urlPostImage = [];
  //   }
  // }

  // secCourseImage(value: any) {
  //   this.urlPostImage.push(value);
  //   if (this.typefile.length == this.urlPostImage.length) {
  //     this.typefile = [];
  //   }
  // }

  public onDeletePost(id: number): void {
    this.postService.deletePost(id).subscribe(
      (response) => {
        
        Swal.fire({
          title: 'Success!',
          text: 'Your post was deleted',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Your post wasnt deleted',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    )
  }

  imageisnull(j:any):boolean{
    if (j != null && (j.includes(".png") || j.includes(".PNG") || j.includes(".jpg"))){
      return true;
    }
    else {return false;}
  }

  videoisnull(j:any):boolean{
    if (j != null && j.includes(".mp4")){
      return true;
    }
    else {return false;}
  }

  public onUpdatePublication(idPost: number, publication: string): void {
    this.postService.updatePost(idPost, publication).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your post was updated',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        this.getPosts();
      }
    );
    
  }



  editPost!: Post;
  editpub:any;
  editfile:any;
  editidpost:any;
  public onOpenModal(post: Post, mode: string): void {
    const container = document.getElementById('maain-containeer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editPost = post;
      this.editpub = post.publication;
      this.editfile = post.typefile;
      this.editidpost = post.idPost;
      console.log("iiiid="+this.editidpost);
      
      console.log(this.editPost)
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'editComment') {
      button.setAttribute('data-target', '#updateCommentModal');
    }
    container!.appendChild(button);
    button.click();
  }


  public onDeleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(
      (response) => {
        
        Swal.fire({
          title: 'Success!',
          text: 'Your comment was deleted',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Success!',
          text: 'Your comment was deleted',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        this.getPosts();
      }
    )
  }


  commentUpdate: any;
  commentID:any;
  public onOpenComment(idComment: number, mode: string): void {
    const container = document.getElementById('maain-containeer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'editComment') {
      button.setAttribute('data-target', '#updateCommentModal');
      this.commentService.getComment(idComment).subscribe(
        (data : Comment |any)=>{
          this.commentUpdate = data.commentaire;
          this.commentID=data.idComment;
          console.log(this.commentID);
        }
      )
    }
    container!.appendChild(button);
    button.click();
  }
  public onCreateLike(idPost:any): void{

    this.likeService.addLike(this.currentuser.id, idPost).subscribe(
      (response) => {
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Your like wasnt added',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    )
    
  }

  public onUpdateComment(idComment: number, commentaaire: string): void {
    this.commentService.updateComment(idComment, commentaaire).subscribe(
      (response) => {
        
        Swal.fire({
          title: 'Success!',
          text: 'Your comment was update',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Success!',
          text: 'Your comment wasnt updated',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        this.getPosts();
      }
    )
  }
  
}
