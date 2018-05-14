export class Aplication{
    users:Array<string>;
    title: string;
    language: string;
	events: Array<string>;
    entityName:string;
	licenseName: string;
    conditions: Array<string>;
    price: number;
    expiredAt: Date;
    createdAt: Date;
    updatedAt: Date;
    get getUsers():Array<string> {
        return this.users;
    }
    set setUsers(users:Array<string>) {
        this.users = users;
    }
    get getTitle():string {
        return this.title;
    }
    set setTitle(title:string) {
        this.title = title
    }
     get getLanguage():string {
        return this.language;
    }
    set setLanguage(language:string) {
        this.language = language;
    }
    get getEvents():Array<string> {
        return this.events;
    }
    set setEvents(events:Array<string>) {
        this.events = events;
    } 
     get getEntityName():string {
        return this.entityName;
    }
    set setEntityName(entityName:string) {
        this.entityName = entityName;
    } 
    get getLicenseName():string {
        return this.licenseName;
    }
    set setLicenseName(licenseName:string) {
        this.licenseName = licenseName
    }
    get getConditions():Array<string> {
        return this.conditions;
    }
    set setConditions(conditions:Array<string>) {
        this.conditions = conditions;
    }
    get getPrice():number {
        return this.price;
    }
    set setPrice(price:number) {
        this.price = price;
    }
    get getExpiredAt():Date {
    	return this.expiredAt;
    }
    set setExpiredAt(expiredAt:Date) {
        this.expiredAt = expiredAt;
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