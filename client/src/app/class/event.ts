
export class Event{
    createdBy: string;
    language:string;
    visible: boolean;
    coordinators: Array<string>;
    sponsors: Array<string>;
    year: string;
    poster: string;
    title: string;
    start: string;
    end: string;
    description: string;
    info:string;
    images: Array<string>;
    aplications: Array<string>;
    reactions: object;
    createdAt: Date;
    updatedAt: Date ;   
    get getCreatedBy():string {
        return this.createdBy;
    }
    set setCreatedBy(createdBy:string) {
        this.createdBy = createdBy;
    }
    get getLanguage():string {
        return this.language;
    }
    set setLanguage(language:string) {
        this.language = language;
    }
    get getVisible():boolean {
        return this.visible;
    }
    set setVisible(visible:boolean) {
        this.visible = visible;
    }
    get getCoordinators():Array<string> {
        return this.coordinators;
    }
    set setCoordinators(coordinators:Array<string>) {
        this.coordinators = coordinators;
    }
    get getSponsors():Array<string> {
        return this.sponsors;
    }
    set setSponsors(sponsors:Array<string>) {
        this.sponsors = sponsors;
    }  
    get getYear():string {
        return this.year;
    }
    set setYear(year:string) {
        this.year = year;
    }
    get getPoster():string {
        return this.poster;
    }
    set setPoster(poster:string) {
        this.poster = poster;
    }
    get getTitle():string {
        return this.title;
    }
    set setTitle(title:string) {
        this.title = title;
    } 
    get getStart():string {
        return this.start;
    }
    set setStart(start:string) {
        this.start = start;
    }
    get getEnd():string {
        return this.end;
    }
    set setEnd(end:string) {
        this.end = end;
    }
    get getDescription():string {
        return this.description;
    }
    set setDescription(description:string) {
        this.description = description;
    }
    get getInfo():string {
        return this.info;
    }
    set setInfo(info:string) {
        this.info = info;
    }
    get getImages():Array<string> {
        return this.images;
    }
    set setImages(images:Array<string>) {
        this.images = images;
    } 
    get getAplications():Array<string> {
        return this.aplications;
    }
    set setAplications(aplications:Array<string>) {
        this.aplications = aplications;
    } 
    get getReactions():object {
        return this.reactions;
    }
    set setReactions(reactions:object) {
        this.reactions = reactions;
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
