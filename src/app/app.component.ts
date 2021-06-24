import { Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';
import * as wjcGridSearch from '@grapecity/wijmo.grid.search';
import { zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('flexgrid') flex?: wjcGrid.FlexGrid;
  title = 'SBFrontEndTechnicalTest';
  filter: string = "";
  collectionView: wjcCore.CollectionView = new wjcCore.CollectionView([]);
  usersFormatted: any[] = [];

  constructor(private data: DataService) { }

  getUsers() {
    this.data.getUsers().subscribe( res => {
      this.usersFormatted = this.formatUsers(res);
      this.collectionView = new wjcCore.CollectionView(this.usersFormatted);
    });
  }

  ngOnInit() {
    this.getUsers();
    wjcCore.setLicenseKey('temp12@liamday.net,E367313254115792#B0MYwpjIyNHZisnOiwmbBJye0ICRiwiI34TUyZjcHhndZplNv9mZl9UbN34MoNzQkZ6VyREeWF5KpF5KEN5KvYVRkNUWPhFbK3mbroFUz5mZ4FEOGJEbzZTWxEjSD96MSNmdDplWMRkenlkUaR5UVtSVZ3kdPFWdqxGeiZlMEpUdY3Waq3yUHNVOSp4YRBTUsd4SntCRHtyRu5ESUlWeFdVR0RVbClTc6Bjb626L98GVCNGZSVTWqpnQFhDRsdzTpZ7LlFGOEJmU0dmUxJWVud7dxJzUBhVYPJGVrNlRoZXd0dEdYJzchx6Y5o4ZlFXa8ElRrQGNolzTiZTWrZVTah5bqRGbJF7QhNmRwdne9IXavMGNyU7MM3mMDFXToticXVnN5pHRuNmQrZmN7FnbwJGTXxkY9FXMThzN7sUVwEnYB54LIljRaZzaXNXVUFUWOdHRIJ5Uix4QyVjS8IXMwRzV4kDeIZGSOVDVCJDTzJkI0IyUiwiIyE4N8QTO7EjI0ICSiwSM9YTM4QDO6MTM0IicfJye#4Xfd5nIJBjMSJiOiMkIsIibvl6cuVGd8VEIgQXZlh6U8VGbGBybtpWaXJiOi8kI1xSfiUTSOFlI0IyQiwiIu3Waz9WZ4hXRgAicldXZpZFdy3GclJFIv5mapdlI0IiTisHL3JyS7gDSiojIDJCLi86bpNnblRHeFBCI73mUpRHb55EIv5mapdlI0IiTisHL3JCNGZDRiojIDJCLi86bpNnblRHeFBCIQFETPBCIv5mapdlI0IiTisHL3JyMDBjQiojIDJCLiUmcvNEIv5mapdlI0IiTisHL3JSV8cTQiojIDJCLi86bpNnblRHeFBCI4JXYoNEbhl6YuFmbpZEIv5mapdlI0IiTis7W0ICZyBlIsICM5QzM7ADI4IjNwEjMwIjI0ICdyNkIsICNycDMxIDMyIiOiAHeFJCLiQXZu9SehRWbhlGbAJTMw5WZ4JiOiEmTDJCLlVnc4pjIsZXRiwiIykzN5ETM4UjMzEzM7YzMiojIklkIs4XXbpjInxmZiwiIyYXMyAjMiojIyVmdiwZZsx');
  }

  initGrid(grid: wjcGrid.FlexGrid) {
    grid.collectionView.filter = (item: any) => {
      if (item['name'].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      } else {
        return false;
      }
    }

    grid.collectionView.sortDescriptions.splice(0, 0, new wjcCore.SortDescription('name', true));
  }

  formatUsers(users: any[]): any[] {
    var usersFormatted: any[] = [];

    users.forEach(x => usersFormatted.push({"name": x.name, 
                                             "age": x.age, 
                                             "registered": new Date(x.registered.substr(0, 19)), 
                                             "email": x.email, 
                                             "balance": Number(x.balance.replace(',', '')) }))
    return usersFormatted;

  }

  zeroBalance() {
    this.usersFormatted.forEach(x => x.balance = 0);
    this.flex?.invalidate(false);
  }

  inputKeyup() {
    this.flex?.collectionView.refresh();
    this.flex?.invalidate(false);
  }


}
