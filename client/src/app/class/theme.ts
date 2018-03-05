import {Comment} from './comment';
export class Theme{
    _id:number;
    language:string;
    visible: boolean;
    createdBy: string;
    thematic: string;
    title: string;
    theme: string;
    classTheme: string;
    megalithicStation: string;
    culturalSecuence: string;
    stage: string;
    continent: string;
    continentGeonameId:string;
    country: string;
    countryGeonameId:string;
    region: string;
    regionGeonameId:string;
    province: string;
    provinceGeonameId:string;
    municipality: string;
    locationDescription: string;
    description: string;
    observation: string;
    discovery: string;
    bibliography: string;
    createdAt: Date;
    updatedAt: Date ;   
    lat: number;
    lng: number;
    reactions: object;
    imagesPrincipal: Array<string>;
    imagesDescription: Array<string>;
    comments:Comment[];

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
    get getCreatedBy():string {
        return this.createdBy;
    }
    set setCreatedBy(createdBy:string) {
        this.createdBy = createdBy;
    }
    get getThematic():string {
        return this.thematic;
    }
    set setThematic(thematic:string) {
        this.thematic = thematic;
    }
    get getTitle():string {
        return this.title;
    }
    set setTitle(title:string) {
        this.title = title;
    }
    get getTheme():string {
        return this.theme;
    }
    set setTheme(theme:string) {
        this.theme = theme;
    }
    get getClassTheme():string {
        return this.classTheme;
    }
    set setClassTheme(classTheme:string) {
        this.classTheme = classTheme;
    }
    get getMegalithicStation():string {
        return this.megalithicStation;
    }
    set setMegalithicStation(megalithicStation:string) {
        this.megalithicStation = megalithicStation;
    }
    get getCulturalSecuence():string {
        return this.culturalSecuence;
    }
    set setCulturalSecuence(culturalSecuence:string) {
        this.culturalSecuence = culturalSecuence;
    }
    get getStage():string {
        return this.stage;
    }
    set setStage(stage:string) {
        this.stage = stage;
    }
    get getContinent():string {
        return this.continent;
    }
    set setContinent(continent:string) {
        this.continent = continent;
    }
    get getContinentGeonameId():string {
        return this.continentGeonameId;
    }
    set setContinentGeonameId(continentGeonameId:string) {
        this.continentGeonameId = continentGeonameId;
    }
    get getCountry():string {
        return this.country;
    }
    set setCountry(country:string) {
        this.country = country;
    }
    get getCountryGeonameId():string {
        return this.countryGeonameId;
    }
    set setCountryGeonameId(countryGeonameId:string) {
        this.countryGeonameId = countryGeonameId;
    } 
    get getRegion():string {
        return this.region;
    }
    set setRegion(region:string) {
        this.region = region;
    }
    get getRegionGeonameId():string {
        return this.regionGeonameId;
    }
    set setRegionGeonameId(regionGeonameId:string) {
        this.regionGeonameId = regionGeonameId;
    }
    get getProvince():string {
        return this.province;
    }
    set setProvince(province:string) {
        this.province = province;
    }
    get getProvinceGeonameId():string {
        return this.provinceGeonameId;
    }
    set setProvinceGeonameId(provinceGeonameId:string) {
        this.provinceGeonameId = provinceGeonameId;
    }
    get getMunicipality():string {
        return this.municipality;
    }
    set setMunicipality(municipality:string) {
        this.municipality = municipality;
    }
    
    get getLocationDescription():string {
        return this.locationDescription;
    }
    set setLocationDescription(locationDescription:string) {
        this.locationDescription = locationDescription;
    }
    get getDescription():string {
        return this.description;
    }
    set setDescription(description:string) {
        this.description = description;
    }
    get getObservation():string {
        return this.observation;
    }
    set setObservation(observation:string) {
        this.observation = observation;
    }
    get getDiscovery():string {
        return this.discovery;
    }
    set setDiscovery(discovery:string) {
        this.discovery = discovery;
    }
    get getBibliography():string {
        return this.bibliography;
    }
    set setBibliography(bibliography:string) {
        this.bibliography = bibliography;
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
    get getReactions():object {
        return this.reactions;
    }
    set setReactions(reactions:object) {
        this.reactions = reactions;
    }
    get getImagesPrincipal():Array<string> {
        return this.imagesPrincipal;
    }
    set setImagesPrincipal(imagesPrincipal:Array<string>) {
        this.imagesPrincipal = imagesPrincipal;
    } 
    get getImagesDescription():Array<string> {
        return this.imagesDescription;
    }
    set setImagesDescription(imagesDescription:Array<string>) {
        this.imagesDescription = imagesDescription;
    }
    get getComments():Comment[] {
        return this.comments;
    }
    set setComments(comments:Comment[]) {
        this.comments = comments;
    }
}
