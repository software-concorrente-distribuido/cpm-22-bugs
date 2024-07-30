import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApplicationService } from '../../../../core/services/application.service';
import { EnumsNames } from '../../../../core/data/enums';
import { Enum } from '../../../../core/types/types';
import { createConvenienceForm } from '../../../../core/utils/forms';

@Component({
  selector: 'ether-convenience-form',
  templateUrl: './convenience-form.component.html',
  styleUrl: './convenience-form.component.scss',
  host: {
    class: 'ether-convenience-form'
  }
})
export class ConvenienceFormComponent implements OnInit {

  public conveniencesFormArray$: BehaviorSubject<FormArray> = new BehaviorSubject<FormArray>(null);

  public conveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  @Input()
  public set conveniencesForm(value: FormArray) {
    this.conveniencesFormArray$.next(value);
  }

  constructor(
    private appService: ApplicationService
  ) {
  }

  public addConvenience(): void {
    this.convenienceFormArray.push(createConvenienceForm());
  }

  public removeConvenience(index: number): void {
    this.convenienceFormArray.removeAt(index);
  }

  public ngOnInit(): void {
    this.loadEnums();
  }

  public get convenienceFormArray(): FormArray {
    return this.conveniencesFormArray$.value;
  }

  public castAbstractToFormGroup(abstract: AbstractControl): FormGroup {
    return abstract as FormGroup;
  }

  private loadEnums(): void {
    this.appService.findEnumByName(EnumsNames.HOTEL_CONVENIENCE)
      .subscribe((enums: Enum[]) => this.conveniences$.next(enums));
  }

}
