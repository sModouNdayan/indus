import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Formulairev2Service } from '../../services/formulairev2.service';
import { DetailComponent } from '../detail/detail.component';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  dataSourceFormulaireNotGeneres: MatTableDataSource<any>;
  displayedColumnsFormulaireNotGeneres = ['frmNom','frmDescription','action'];
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>()
  applyFilterNotGeneres(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFormulaireNotGeneres.filter = filterValue.trim().toLowerCase();
  }

  form: FormGroup = new FormGroup({
		frmNom: new FormControl(false),
		frmDescription: new FormControl(false),
    frmStatus: new FormControl(false),
		action: new FormControl(false),

	});

  frmNom1 = this.form.get('frmNom');
	frmDescription1 = this.form.get('frmDescription');
  frmStatus1 = this.form.get('frmStatus');
	action1 = this.form.get('action');

  columnDefinitionsNoGeneres = [
		{ def: 'frmNom', label: 'formulaire.frmNom', hide: false },
		{ def: 'frmDescription', label: 'formulaire.frmDescription', hide: false },
		{ def: 'action', label: 'register.action', hide: false },

	]

  getDisplayedColumnsNoGeneres(): string[] {
		return this.columnDefinitionsNoGeneres.filter(cd => !cd.hide).map(cd => cd.def);
	}
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notification: NotificationService, private translate: TranslateService,
    private formulaireV2Service: Formulairev2Service) { }

  ngOnInit() {
    let o11: Observable<boolean> = this.frmNom1.valueChanges;
		let o22: Observable<boolean> = this.frmDescription1.valueChanges;
    let o33: Observable<boolean> = this.action1.valueChanges;

		merge(o11, o22, o33).subscribe(v => {
			this.columnDefinitionsNoGeneres[0].hide = this.frmNom1.value;
			this.columnDefinitionsNoGeneres[1].hide = this.frmDescription1.value;
			this.columnDefinitionsNoGeneres[2].hide = this.action1.value;
			
		});
    this.listeFormulaireNonGenerer();
  }

  listeFormulaireNonGenerer(){
    this.formulaireV2Service.getList().subscribe((data:any)=>{
      this.dataSourceFormulaireNotGeneres = data.data;
      this.dataSourceFormulaireNotGeneres.paginator = this.paginator.toArray()[0];
    })
  }
  openDialogAddForm(): void {
    const dialog1 = this.dialog.open(EditFormComponent, {
      disableClose: true,
      // width: '700px',

    }).afterClosed().subscribe(result => {
			if(result.status){
        this.listeFormulaireNonGenerer();
      }
		});

  }
  openDialogEditForm(element){
    const dialog1 = this.dialog.open(EditFormComponent, {
      disableClose: true,
      data: element
      // width: '700px',

    }).afterClosed().subscribe(result => {
			if(result.status){
        this.listeFormulaireNonGenerer();
      }
		});
  }

  openDialogDetail(element){
    const dialog1 = this.dialog.open(DetailComponent, {
      disableClose: true,
      data: element,
      width: 'fit-content'

    }).afterClosed().subscribe(result => {
			
		});
  }
}
