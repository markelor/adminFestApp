
export class Event{
    createdBy: string;
    categoryId:string;
    aplicationIds: Array<string>;
    sponsorIds: Array<string>;
    language:string;
    visible: boolean;
    coordinators: Array<string>;
    title: string;
    start: string;
    end: string;
    description: string;
    info:string;
    reactions: object;
    imagesPoster: Array<string>;
    imagesDescription: Array<string>;
    createdAt: Date;
    updatedAt: Date ;   
    get getCreatedBy():string {
        return this.createdBy;
    }
    set setCreatedBy(createdBy:string) {
        this.createdBy = createdBy;
    }
    get getCategoryId():string {
        return this.categoryId;
    }
    set setCategoryId(categoryId:string) {
        this.categoryId = categoryId;
    }
    get getAplicationIds():Array<string> {
        return this.aplicationIds;
    }
    set setAplicationIds(aplicationIds:Array<string>) {
        this.aplicationIds = aplicationIds;
    } 
    get getSponsorIds():Array<string> {
        return this.sponsorIds;
    }
    set setSponsorIds(sponsorIds:Array<string>) {
        this.sponsorIds = sponsorIds;
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
    get getReactions():object {
        return this.reactions;
    }
    set setReactions(reactions:object) {
        this.reactions = reactions;
    }
    get getImagesPoster():Array<string> {
        return this.imagesPoster;
    }
    set setImagesPoster(imagesPoster:Array<string>) {
        this.imagesPoster = imagesPoster;
    } 
    get getImagesDescription():Array<string> {
        return this.imagesDescription;
    }
    set setImagesDescription(imagesDescription:Array<string>) {
        this.imagesDescription = imagesDescription;
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
