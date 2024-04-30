import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    isAuth= false;
    private userSub: Subscription;
    
    constructor(private dataStorageService : DataStorageService, private authService: AuthService){}
    
    onLogout(){
        this.authService.logout();
    }

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user =>{
            this.isAuth = !!user;
        });
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}