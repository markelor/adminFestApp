export class Comment{
	createdBy: string;
    eventId: string;
    originCommentId: Array<string>;
    language:string;
    mentionedUsers: Array<string>;   
    comment: string;
    createdAt: number;
    updatedAt: number ; 
    reactions: object;
     get getCreatedBy():string {
        return this.createdBy;
    }
    set setCreatedBy(createdBy:string) {
        this.createdBy = createdBy;
    }
    get getEventId():string {
        return this.eventId;
    }
    set setEventId(eventId:string) {
        this.eventId = eventId;
    }
    get getOriginCommentId():Array<string> {
        return this.originCommentId;
    }
    set setOriginCommentId(originCommentId:Array<string>) {
        this.originCommentId = originCommentId;
    }
    get getLanguage():string {
        return this.language;
    }
    set setLanguage(language:string) {
        this.language = language;
    }
    get getMentionedUsers():Array<string> {
        return this.mentionedUsers;
    }
    set setMentionedUsers(mentionedUsers:Array<string>) {
        this.mentionedUsers = mentionedUsers;
    } 
    get getComment():string {
        return this.comment;
    }
    set setComment(comment:string) {
        this.comment = comment;
    }
     get getCreatedAt():number {
        return this.createdAt;
    }
    set setCreatedAt(createdAt:number) {
        this.createdAt = createdAt;
    }
    get getUpdatedAt():number {
        return this.updatedAt;
    }
    set setUpdatedAt(updatedAt:number) {
        this.updatedAt = updatedAt;
    }
    get getReactions():object {
        return this.reactions;
    }
    set setReactions(reactions:object) {
        this.reactions = reactions;
    }

}