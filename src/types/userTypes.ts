export interface UserInterface {
    name: string;
    email: string;
    id: number;
    userName: string;
    website: string;
    phone: string;
    address: userAddressInterface;
    company: userCompanyInterface;
}

interface userAddressInterface {
    city : string; 
    street : string;
    suite : string;
    zipcode : string;
    geo : userAddressGeoInterface;
}

interface userCompanyInterface {
    name : string;
    catchPhrase : string;
    bs : string;
}

interface userAddressGeoInterface {
    lat : string;
    lng : string;
}

