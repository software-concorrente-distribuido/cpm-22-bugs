import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Optional } from '../../../../core/utils/optional';
import { Enum } from '../../../../core/types/types';
import { ApplicationService } from '../../../../core/services/application.service';
import { EnumsNames } from '../../../../core/data/enums';

@Component({
  selector: 'ether-convenience-form',
  templateUrl: './convenience-form.component.html',
  styleUrl: './convenience-form.component.scss',
  host: {
    class: 'ether-convenience-form'
  }
})
export class ConvenienceFormComponent implements OnInit {
  public convenienceForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public conveniences$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  @Input()
  public set conveniencesFormArray(conveniences: FormArray) {
    this.convenienceForm$.next(conveniences.controls[0] as FormGroup);
  }

  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
    this.loadEnum();
  }

  public get conveniences(): Enum[] {
    return this.conveniences$.value;
  }

  public findConvenienceDescription(type: string): string {
    return Optional.ofNullable(this.conveniences)
      .map(convenience => convenience.find(convenience => convenience.name === type))
      .map(convenience => convenience.description)
      .orElse(null);
  }

  private loadEnum(): void {
    this.appService.findEnumByName(EnumsNames.HOTEL_ROOM_CONVENIENCE)
      .subscribe((enums: Enum[]) => this.conveniences$.next(enums));
  }
}
