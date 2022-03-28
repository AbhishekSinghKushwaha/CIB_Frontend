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

  /*********API ENDPOINTS****************/

  // Add User details
  addTeamMember(payload: TeamMember, corporateId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.addCorporateUser +
        corporateId,
      payload
    );
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
      environment.apiUrl + urlList.customerOnboarding.getCorporateUser + userId
    );
  }

  // Update Director Details
  updateTeamMemberDetails(payload: any, userId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.updateCorporateUserDetails +
        userId,
      payload
    );
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
