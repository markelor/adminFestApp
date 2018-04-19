export class Place{
    sponsorId:string;
	eventId: string;
	language: string;
    province: string;
    municipality: string;
    location:string;
    lat:number;
    lng:number;
    createdAt: Date;
    updatedAt: Date; 
    get getSponsorId():string {
        return this.sponsorId;
    }
    set setSponsorId(sponsorId:string) {
        this.sponsorId = sponsorId;
    }
    get getEventId():string {
        return this.eventId;
    }
    set setEventId(eventId:string) {
        this.eventId = eventId;
    }
    get getLanguage():string {
        return this.language;
    }
    set setLanguage(language:string) {
        this.language = language;
    }
    get getProvince():string {
        return this.province;
    }
    set setProvince(province:string) {
        this.province = province;
    }
    get getMunicipality():string {
        return this.municipality;
    }
    set setMunicipality(municipality:string) {
        this.municipality = municipality;
    }
    get getLocation():string {
        return this.location;
    }
    set setLocation(location:string) {
        this.location = location;
    }
    get getLat():number {
        return this.lat;
    }
    set setLat(lat:number) {
        this.lat = lat;
    }
    get getLng():number {
        return this.lng;
    }
    set setLng(lng:number) {
        this.lng = lng;
    }
    get getCreatedAt():Date {
        return this.createdAt;
    }
    set setCreatedAt(createdAt:Date) {
        this.createdAt = createdAt;
    }
    get getUpdatedAt():Date {
        return this.updatedAt;
    }
    set setUpdatedAt(updatedAt:Date) {
        this.updatedAt = updatedAt;
    }
}