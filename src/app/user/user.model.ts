export class User {
    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public name: string;
    public age: number;
    public gender: string;
    public role?: number ;

    constructor(username: string, 
                password: string, 
                email: string, 
                name: string, 
                age: number, 
                gender: string,
                role: number)
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.role = role;
    }

}