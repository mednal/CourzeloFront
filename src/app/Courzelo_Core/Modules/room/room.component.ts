import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';

declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, AfterViewInit {

  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;
  currentUser: any;
  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser=this.tokenService.getUser();
    this.room = 'Meet With Mate'
    this.user = {
        name: this.currentUser.displayName//'RECOVERY MANAGER' // Set your username
    }
  }

  ngAfterViewInit(): void {
      this.options = {
          roomName: this.room,
          width: 900,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

      // Event handlers
      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
  }

  handleClose = () => {
    console.log("handleClose");
    alert("Meet Closed");
  }

  handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
  // this.router.navigate(['/hr/recruitment/interview/annexe']);
  }

  handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); // { muted: true }
  }

  getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); // get all participants
        }, 500)
    });
  }

  executeCommand(command: string) {
  this.api.executeCommand(command);;
  if(command == 'hangup') {
    // this.router.navigate(['/hr/recruitment/interview/annexe']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
  }

}
