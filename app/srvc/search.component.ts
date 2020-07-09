import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Component({
 selector: 'app-search',
 templateUrl: 'search.component.html',
 styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
results: any[] = [];
 queryField: FormControl = new FormControl();
//  constructor(private _searchService: SearchService) { }
ngOnInit() {
    console.log('ffffffffffffsearch');
    
 this.queryField.valueChanges
 .subscribe( result => console.log(result));
 }
}