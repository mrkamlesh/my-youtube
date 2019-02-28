import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, Platform } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { YtProvider } from '../../providers/yt/yt';
import { Observable } from 'rxjs/Observable';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  channelId = 'UCZZPgUIorPao48a1tBYSDgg';
  playlists: Observable<any[]>;
  videos: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private ytProvider: YtProvider,
    private youtube: YoutubeVideoPlayer,
    private plt: Platform
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.searchPlaylists();
  }

  presentAccount() {
    const modal = this.modalCtrl.create(AccountPage);
    modal.present();
  }

  searchPlaylists() {
    this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID',
        buttons: ['OK']
      });
      alert.present();
    })
  }
 
  openPlaylist(id) {
    console.log("Playlist Id:", id);
    
    // this.navCtrl.push('PlaylistPage', {id: id});
    this.videos = this.ytProvider.getListVideos(id);
  }

  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }
}
