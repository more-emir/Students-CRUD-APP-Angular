import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrl: './student-add-edit.component.scss',
})
export class StudentAddEditComponent implements OnInit {
  stdForm: FormGroup;

  education: string[] = [
    'Secondary',
    'Associate Degree',
    "Bachelor's Degree ",
    "Master's Degree",
    'Ph.D',
  ];

  constructor(
    private _fb: FormBuilder,
    private _stdService: StudentService,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.stdForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      university: '',
      year: '',
      major: '',
    });
  }

  ngOnInit(): void {
    this.stdForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.stdForm.valid) {
      if (this.data) {
        this._stdService.updateStudent(this.data.id, this.stdForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Student has been updated!')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      } else {
        this._stdService.addStudent(this.stdForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Student has been added successfully!')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
