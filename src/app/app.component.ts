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
