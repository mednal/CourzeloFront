import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from '../../Shared/Service/post.service';
import { Post } from '../Entity/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  // postId!: string;
  // post: Post = new Post(
  //   0,
  //   '',
  //   []
  // );
  constructor(private postService: PostService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.postId = params.get('id') || '';
    // });
    // this.postService.getPostById(Number(this.postId)).subscribe(
    //   (data) => {
    //     this.post = data;
    //     // this.post.publication = data.publication;
    //     // this.post.user = Object.values(data.user);
    //   }
    // );
  }

}
