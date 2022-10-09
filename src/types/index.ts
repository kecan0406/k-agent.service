export type CompanyType = {
  id: number;
  companyName: String;
  companyLocation: String;
  companyPhoneNumber: String;
  companyFaxNumber: String;
  companySector: String;
  companyScale: String;
  serviceType: String;
  companyKeyword: String;
  kreditJobKey: String;
};

export type CompanyListType = {
  companies: Array<CompanyType>;
  companyCount: number;
};
