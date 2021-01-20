import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmployee, Employee } from 'app/shared/model/employee.model';
import { EmployeeService } from './employee.service';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person/person.service';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  isSaving = false;
  people: IPerson[] = [];

  editForm = this.fb.group({
    id: [],
    employeeNumber: [],
    employedDate: [],
    terminatedDate: [],
    person: [],
  });

  constructor(
    protected employeeService: EmployeeService,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      if (!employee.id) {
        const today = moment().startOf('day');
        employee.employedDate = today;
        employee.terminatedDate = today;
      }

      this.updateForm(employee);

      this.personService
        .query({ filter: 'employee-is-null' })
        .pipe(
          map((res: HttpResponse<IPerson[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPerson[]) => {
          if (!employee.person || !employee.person.id) {
            this.people = resBody;
          } else {
            this.personService
              .find(employee.person.id)
              .pipe(
                map((subRes: HttpResponse<IPerson>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPerson[]) => (this.people = concatRes));
          }
        });
    });
  }

  updateForm(employee: IEmployee): void {
    this.editForm.patchValue({
      id: employee.id,
      employeeNumber: employee.employeeNumber,
      employedDate: employee.employedDate ? employee.employedDate.format(DATE_TIME_FORMAT) : null,
      terminatedDate: employee.terminatedDate ? employee.terminatedDate.format(DATE_TIME_FORMAT) : null,
      person: employee.person,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployee {
    return {
      ...new Employee(),
      id: this.editForm.get(['id'])!.value,
      employeeNumber: this.editForm.get(['employeeNumber'])!.value,
      employedDate: this.editForm.get(['employedDate'])!.value
        ? moment(this.editForm.get(['employedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      terminatedDate: this.editForm.get(['terminatedDate'])!.value
        ? moment(this.editForm.get(['terminatedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      person: this.editForm.get(['person'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPerson): any {
    return item.id;
  }
}
