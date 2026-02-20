
import { IsString, Matches, MinLength } from 'class-validator';

export class createUserDto{

    @IsString({ message: 'Name must be A letter.' })
    @MinLength(3, { message: 'Name must be more than 3 letters.' })
    username: String;

    //ting@itc.edu.kh or ting.@gmail.com
    @Matches(/^[\w.-]+@([\w.-]+\.edu\.kh|[\w.-]+\.gmail\.com)$/, { message: "Email is Wrong" })
    email: String;

    @IsString({ message: 'Password is not correct' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[*&+@!$%]).{6,10}$/, {
        message: 'Password must be 6-10 characters including Lowercase, Uppercase, and special characters'
    })
    password: string;
}