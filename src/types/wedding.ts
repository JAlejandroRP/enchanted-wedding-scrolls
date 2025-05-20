export interface Location {
  name: string;
  address: string;
  time: string;
  mapUrl: string;
  imageUrl?: string;
  mapIframe?: string;
}

export interface GiftRegistry {
  name: string;
  url: string;
}

export interface BankInfo {
  bank: string;
  accountHolder: string;
  accountNumber: string;
}

export interface GiftsInfo {
  giftRegistries: GiftRegistry[];
  bankInfo: BankInfo;
  wishlist: string[];
}

export interface DressCode {
  formalWear: string[];
  avoidColors: string[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface WeddingData {
  groomFirstName: string;
  groomLastName: string;
  brideFirstName: string;
  brideLastName: string;
  weddingDate: Date;
  backgroundImageUrl: string;
  mobileBackgroundImageUrl?: string;
  ceremonyLocation: Location;
  receptionLocation: Location;
  galleryImages: string[];
  dressCode: DressCode;
  giftsInfo: GiftsInfo;
  themeColors: ThemeColors;
}

export interface FormData extends WeddingData {} 