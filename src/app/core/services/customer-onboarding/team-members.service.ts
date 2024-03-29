import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TeamMember } from "../../domain/customer-onboarding.model";
import urlList from "../service-list.json";
import { StateService } from "../state/state.service";

interface UserState {
  user: TeamMember;
}

const initialState: UserState = {
  user: {},
};
@Injectable({
  providedIn: "root",
})
export class TeamMembersService extends StateService<UserState> {
  selectedUser$: Observable<TeamMember> = this.select((state) => state.user);
  constructor(private http: HttpClient) {
    super(initialState);
  }

  /*********STATE MANAGEMENT****************/
  setUser(user: TeamMember) {
    this.setState({ user });
  }

  getUser() {
    return this.state;
  }

  /*********API ENDPOINTS****************/

  // Add User details
  addTeamMember(payload: TeamMember) {
    return {
      onboarding: (corporateId: string) => this.http.post(
        environment.apiUrl +
        urlList.customerOnboarding.addCorporateUser +
        corporateId,
        payload
      ),
      userManagement: this.http.post(
        ` ${environment.apiUrl}${urlList.userManagement.addUser}`,
        payload
      )
    }
  }

  // Get list of users
  getTeamMembers(corporateId: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
      urlList.customerOnboarding.getCorporateUsers +
      corporateId
    );
  }

  // Get A team member details
  getTeamMemberDetails(userId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}${urlList.userManagement.getUser}${userId}`
    );
  }

  // Update Director Details
  updateTeamMemberDetails(payload: any) {
    return {
      onboading: (userId: string) => this.http.post(
        environment.apiUrl +
        urlList.customerOnboarding.updateCorporateUserDetails +
        userId,
        payload
      ),
      userManagement: (username: string) => this.http.put(
        `${environment.apiUrl}${urlList.userManagement.addUser}/${username}`,
        payload
      ),
    }
  }

  // Delete Corporate User
  deleteTeamMember(referenceId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      urlList.customerOnboarding.removeCorporateUser +
      referenceId,
      {}
    );
  }
}
