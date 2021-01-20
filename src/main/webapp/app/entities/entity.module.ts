import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EohAssignmentEmployeeModule),
      },
      {
        path: 'person',
        loadChildren: () => import('./person/person.module').then(m => m.EohAssignmentPersonModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EohAssignmentEntityModule {}
