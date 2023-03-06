import { MenuListItemType } from '@src/modules/Menu/type';
import { PickerItemType } from '@src/components/Modal/PickerModal'

export interface TimeValue {
  startTime?: string;
  endTime?: string;
}

export interface DateValue {
  year: string;
  month: string;
  date: string;
  dateString: string;
}

export interface CustomerListItemType {
  initial?: string;
  data: CustomerType[];
}

export interface ReportPhotoType {
  id: number | null;
  url: string | null;
}

export interface IReportListItem {
  user: CustomerType;
  report: CustomerReportType[];
}

export interface CustomerReportType {
  id?: string;
  photoUrls: ReportPhotoType[];
  date: DateValue;
  startEndtime: TimeValue;
  selectedMenuItems: MenuListItemType[];
  tips: string;
  payment: PickerItemType;
  memo: string;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
}

export interface CustomerType {
  id: string;
  firstLetter: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  mobile?: string;
  mail?: string;
  instagram?: string;
  twitter?: string;
  memo?: string;
  profileImg: string | null;
  lastVisit?: string;
}

