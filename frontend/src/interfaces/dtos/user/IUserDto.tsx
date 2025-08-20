import { IRoleDto } from "../role/IRoleDto";

export interface IUserDto {
    id?: number;
    email?: string;
    name?: string;
    surname?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    tcNo?: string;
    roles?: IRoleDto[];
}