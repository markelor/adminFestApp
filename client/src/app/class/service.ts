export class Service{
	serviceTypeId: string;
	language: string;
    title: string;
    description: string;
    lat:number;
    lng:number;
    createdAt: Date;
    updatedAt: Date; 

    get getServiceTypeId():string {
        return this.serviceTypeId;
    }
    set setServiceTypeId(serviceTypeId:string) {
        this.serviceTypeId = serviceTypeId;
    }
    get getLanguage():string {
        return this.language;
    }
    set setLanguage(language:string) {
        this.language = language;
    }
    get getTitle():string {
        return this.title;
    }
    set setTitle(title:string) {
        this.title = title;
    }
    get getDescription():string {
        return this.description;
    }
    set setDescription(description:string) {
        this.description = description;
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