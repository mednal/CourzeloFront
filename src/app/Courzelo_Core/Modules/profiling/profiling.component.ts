import { T } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../Shared/Service/auth.service';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';
import { User } from '../Entity/user';
import { CourseService } from 'src/app/Courzelo_Trainer/Shared/Services/course.service';
import { PostService } from '../../Shared/Service/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../Entity/post';
import Swal from 'sweetalert2';
import { CommentService } from '../../Shared/Service/comment.service';
import { SkillsService } from 'src/app/Courzelo_Skills/Shared/Services/Skills.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.component.html',
  styleUrls: ['./profiling.component.css']
})
export class ProfilingComponent implements OnInit {

  

  constructor(private authService: AuthService, 
              private tokenService: TokenStorageService, 
              private activatedRoute: ActivatedRoute, 
              private courseService: CourseService, 
              private postService: PostService,
              private commentService: CommentService,
              private skillservice : SkillsService,
              private _router:Router) { }
  userID: any;
  displayName: any;
  currentUser: any;
  val: any;
  coursesList:any;
  form: any = {};
  isSuccessful = false;
  posts: Post[] | any;
  index: any;
  isfollwed: any;
  followinglist:number[]=[];
  name:string[]=[];
  nb:number[]=[];
  nbsoft:number[]=[];
  namesoft:string[]=[];
  loaded = false;
listfollowersname:string[]|any;
public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          stepSize: 20
      },
          min: 0,
          max: 100
      }
  }
  };

  public radarChartType: ChartType = 'radar';

  public radarChartLabels: string[] = this.name;
  public radarChartLabelsSoft: string[] = this.namesoft;

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: this.nb, label: 'total_progress',
      backgroundColor: 'rgba(44,66,89, 0.5)',
      borderColor: '#1f3e5e',
      pointBackgroundColor: '#1f3e5e',
      
     },

    ]
  };

   public radarChartDataSoft: ChartData<'radar'> = {
    labels: this.radarChartLabelsSoft,
    datasets: [
      { data: this.nbsoft, label: 'total_progress',
      backgroundColor: 'rgba(44,66,89, 0.5)',
      borderColor: '#1f3e5e',
      pointBackgroundColor: '#1f3e5e',
      
     },

    ]
  };
  user!: User;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userID= params.get('id') || '';
    });
    this.currentUser = this.tokenService.getUser();
    this.onGetUser();
    if(this.currentUser.id == this.userID){
      this.val = true;
    } else {
      this.val = false;
    }
this.isfollwed=this.currentUser.following.includes(Number(this.userID))
console.log('bbbbb');
console.log(this.listfollowersname);
    console.log(this.isfollwed);
    this.getUser(this.userID);
    this.courseService.getAllCourses().subscribe(
      data => {this.coursesList=data;},
      err => {console.log(err);}
    );

    this.user = new User();

    this.getPosts();
/*     this.getUsers();*/
    this.skillservice.GetMacrohardskills().subscribe(data=>{
      data.map(res=>{this.name.push(res.name)
      this.nb.push(res.totalprogress)
    }
      )
      this.loaded=true;
    }
    );

    this.skillservice.GetMacrosoftskills().subscribe(data=>{
      data.map(res=>{this.namesoft.push(res.name)
      this.nbsoft.push(res.totalprogress)
    
      }
      )
      this.loaded = true;
    }
    );
  }

  chartClicked (e: any): void {
    this._router.navigateByUrl("/skillsSpace/Macrohard/"+this.radarChartLabels[e.active[0].index]);
  }
 

public onUpdateUser(): void {
    this.authService.updateUser(this.user, this.currentUser.id).subscribe(
      (response: User) => {
        console.log(response);
        //this.getEmployees();
        Swal.fire({
          title: 'Success!',
          text: 'You have followed this mate',
          icon: 'success',
          confirmButtonText: 'Return'
        })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSubmit() {
    this.onUpdateUser();    
  } 
  public  getUser(id: number): void {
    
    this.authService.getUserById(id).subscribe(
      (response: User) => {
        this.displayName = response.displayName;
        this.followinglist = response.following;

      },
      (error: HttpErrorResponse) => {

      }
    );
    
  }


  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('maain-containeer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'macrohard') {
      button.setAttribute('data-target', '#macrohardModal');
    }
    if (mode === 'macrosoft') {
      button.setAttribute('data-target', '#macrosoftModal');
    }
    container!.appendChild(button);
    button.click();
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

  public getPosts(): void {
    this.postService.getPostByUser(this.userID).subscribe(
      (response: Post[]) => {
        this.posts = response;
        console.log(this.posts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddComment(addComment: NgForm, idPost: any): void {
    this.currentUser = this.tokenService.getUser();
    // this.postService.getPostById(id).subscribe(
    //   (data) => {
    //     this.post = data;
    //     // this.post.publication = data.publication;
    //     // this.post.user = Object.values(data.user);
    //   }
    // );
    this.commentService.addComment(addComment.value, this.currentUser.id, idPost).subscribe(
      (response: Comment | null) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your Comment was added',
          icon: 'success',
          confirmButtonText: 'Return'
        })
         console.log(this.currentUser.id);

        // this.reloadPage();
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


  
  public FollowUser(id:number)
  {
     console.log(this.currentUser.followers);
    this.authService.FollowUser(id, this.currentUser.id).subscribe(
      (response)=> {
        Swal.fire({
          title: 'Success!',
          text: 'You have followed this mate',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        this.onGetUser();
        
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Your follow wasnt applied',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
  
    );
  
  }
  
  public onGetUser()
{
   
  this.authService.getUserById(this.currentUser.id).subscribe(
    (response: User)=> {
      this.followinglist= response.following;
      
    },
    (error: HttpErrorResponse) => {
      
    }

  );

}
users:any;

/* public getUsers(): void {
  this.authService.getUsers().subscribe(
    (response: User[]) => {
      this.users = response;
      const results: User[] = [];
      
      console.log(this.users);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
} */
}
