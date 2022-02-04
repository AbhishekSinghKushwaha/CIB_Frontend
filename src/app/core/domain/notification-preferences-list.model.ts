import { NotificationMenuItem } from "./notification-menu-item.model";

export interface NotificationDashboardList {
  section: string;
  content: NotificationMenuItem[];
}
