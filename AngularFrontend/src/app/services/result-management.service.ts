import { Injectable } from '@angular/core';

import{ HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ResultManagementService {
  studentUrl='http://localhost:5000/api/students';
  findUrl='http://localhost:5000/api/find';
  registerUrl='http://localhost:5000/api/register';
  loginUrl='http://localhost:5000/api/login';


  constructor(private http:HttpClient,private router:Router) { }

  getStudents(){
    return this.http.get(this.studentUrl);
  }
  addStudent(data:any){
    return this.http.post(this.studentUrl,data);
  }
  deleteStudent(id:any){
    return this.http.delete(`${this.studentUrl}/${id}`);
  }
  getStudent(id:any){
    return this.http.get(`${this.studentUrl}/${id}`);
  }
  updateStudent(id:any,student:any){
    return this.http.put(`${this.studentUrl}/${id}`,student);
  }
  findStudent(student:any){
    return this.http.post(this.findUrl,student).pipe(catchError(this.errorHandler));
  }
  registerTeacher(teacher:any){
    return this.http.post(this.registerUrl,teacher).pipe(catchError(this.errorHandler));
  }
  loginTeacher(teacher:any){
    return this.http.post(this.loginUrl,teacher).pipe(catchError(this.errorHandler));
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
   this.removeToken();
    this.router.navigate(['/']);
  }
  removeToken(){
    localStorage.removeItem('token');
  }
  errorHandler(error:HttpErrorResponse){
    return throwError(error.error.message||'server error');
    
  }
  
}
