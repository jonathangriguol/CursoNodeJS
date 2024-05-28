export default class UserSessionDto {
    constructor(userSessionDto) {
        this.user = userSessionDto.email,
        this.userName = `${userSessionDto.first_name} ${userSessionDto.last_name}` ,
        this.role = userSessionDto.role
    }
}